'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Plus, Minus, Crosshair, ChevronLeft, ChevronRight } from 'lucide-react';
import { CityBuildingData, TimeOfDay, CameraMode } from '../lib/types';
import {
  createAsphaltTexture,
  createSidewalkTexture,
  createWindowTexture,
  createHelipadTexture,
} from '../lib/cityGenerator';

interface CityScene3DProps {
  buildings: CityBuildingData[];
  selectedBuilding: CityBuildingData | null;
  onSelectBuilding: (b: CityBuildingData) => void;
  timeOfDay: TimeOfDay;
  cameraMode: CameraMode;
  onCameraUpdate?: (pos: { x: number; z: number }, angle: number) => void;
  isFullscreen?: boolean;
  active?: boolean;
}

export function CityScene3D({
  buildings,
  selectedBuilding,
  onSelectBuilding,
  timeOfDay,
  cameraMode,
  onCameraUpdate,
  isFullscreen = false,
  active = true,
}: CityScene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamPos = useRef<THREE.Vector3 | null>(null);
  const targetCamLookAt = useRef<THREE.Vector3 | null>(null);
  const beaconGroupRef = useRef<THREE.Group | null>(null);
  const beaconRingsRef = useRef<THREE.Mesh[]>([]);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);

  const [hoveredBuilding, setHoveredBuilding] = useState<CityBuildingData | null>(null);
  const [screenPos, setScreenPos] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const trafficRef = useRef<{ mesh: THREE.InstancedMesh; data: { x: number; z: number; speed: number; lane: number; isEastWest: boolean }[] } | null>(null);
  const selectedBuildingRef = useRef(selectedBuilding);
  selectedBuildingRef.current = selectedBuilding;

  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera - Crisp 44 FOV
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.5, 2500);
    camera.position.set(240, 190, 270);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls with user-friendly scroll behavior
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minDistance = 35;
    controls.maxDistance = 800;
    controls.target.set(0, 45, 0);

    // Allow panning with right-click or two-finger drag
    controls.enablePan = true;
    controls.panSpeed = 1.0;
    controls.screenSpacePanning = true;

    // CRITICAL: Disable wheel zoom on landing page preview to prevent vertical scroll hijacking!
    controls.enableZoom = isFullscreen;
    controls.zoomSpeed = 0.6;
    controlsRef.current = controls;

    // 5. Ground & Road Network with Clean Wet Sheen
    const asphaltTex = createAsphaltTexture();
    asphaltTex.repeat.set(1, 14);

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x14181b,
      roughness: 0.88,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Asphalt Roads Grid
    const roadMat = new THREE.MeshStandardMaterial({
      map: asphaltTex,
      roughness: 0.35,
      metalness: 0.25,
      color: 0xa0a8ac,
    });

    const roadPitch = 89;
    for (let idx = -3; idx <= 4; idx++) {
      const roadOffset = idx * roadPitch + roadPitch / 2;

      const roadNS = new THREE.Mesh(new THREE.BoxGeometry(24, 0.25, 1600), roadMat);
      roadNS.position.set(roadOffset, 0.08, 0);
      roadNS.receiveShadow = true;
      scene.add(roadNS);

      const roadEW = new THREE.Mesh(new THREE.BoxGeometry(24, 0.25, 1600), roadMat);
      roadEW.rotation.y = Math.PI / 2;
      roadEW.position.set(0, 0.08, roadOffset);
      roadEW.receiveShadow = true;
      scene.add(roadEW);
    }

    // Sidewalks
    const sidewalkTex = createSidewalkTexture();
    sidewalkTex.repeat.set(2, 2);
    const sidewalkMat = new THREE.MeshStandardMaterial({
      map: sidewalkTex,
      roughness: 0.65,
      metalness: 0.1,
      color: 0x283035,
    });

    // 6. High-Definition Procedural Window Textures with Emissive Channel
    const officeTex = createWindowTexture('office', 215);
    const techTex = createWindowTexture('glass_tech', 195);
    const cyberTex = createWindowTexture('cyber', 45);
    const helipadTex = createHelipadTexture();

    // 7. Generate Buildings with Architectural Detailing
    const buildingMeshes: THREE.Mesh[] = [];

    const glassLobbyMat = new THREE.MeshStandardMaterial({
      color: 0x0a1014,
      roughness: 0.1,
      metalness: 0.9,
      emissive: new THREE.Color(0x38bdf8),
      emissiveIntensity: 0.2,
    });

    buildings.forEach((b) => {
      let texPair = officeTex;
      if (b.style === 'glass_tower') texPair = techTex;
      else if (b.style === 'spire') texPair = cyberTex;

      const towerMat = new THREE.MeshStandardMaterial({
        map: texPair.diffuse,
        emissiveMap: texPair.emissive,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 1.1,
        roughness: 0.35,
        metalness: 0.7,
        color: b.resident ? 0x22303c : 0x161e24,
      });

      const baseGeo = new THREE.BoxGeometry(b.width, b.height, b.depth);
      const towerMesh = new THREE.Mesh(baseGeo, towerMat);
      towerMesh.position.set(b.x, b.height / 2, b.z);
      towerMesh.castShadow = true;
      towerMesh.receiveShadow = true;
      towerMesh.userData = { building: b };
      scene.add(towerMesh);
      buildingMeshes.push(towerMesh);

      // Sidewalk Island Base
      const padGeo = new THREE.BoxGeometry(b.width + 6, 1.0, b.depth + 6);
      const padMesh = new THREE.Mesh(padGeo, sidewalkMat);
      padMesh.position.set(b.x, 0.5, b.z);
      padMesh.receiveShadow = true;
      scene.add(padMesh);

      // Glass Entrance Lobby at street level
      const lobbyGeo = new THREE.BoxGeometry(b.width + 0.3, 7, b.depth + 0.3);
      const lobbyMesh = new THREE.Mesh(lobbyGeo, glassLobbyMat);
      lobbyMesh.position.set(b.x, 3.5, b.z);
      scene.add(lobbyMesh);

      // Rooftop Details
      const roofY = b.height;

      if (b.roofStyle === 'helipad') {
        const heliGeo = new THREE.BoxGeometry(b.width * 0.78, 1.2, b.depth * 0.78);
        const heliMat = new THREE.MeshStandardMaterial({
          map: helipadTex,
          roughness: 0.45,
          metalness: 0.2,
        });
        const heliMesh = new THREE.Mesh(heliGeo, heliMat);
        heliMesh.position.set(b.x, roofY + 0.6, b.z);
        scene.add(heliMesh);
      } else if (b.roofStyle === 'antenna' || b.roofStyle === 'spire_crown') {
        const mastH = 26 + b.height * 0.12;
        const mastGeo = new THREE.CylinderGeometry(0.3, 1.1, mastH, 8);
        const mastMat = new THREE.MeshStandardMaterial({
          color: 0x94a3b8,
          metalness: 0.9,
          roughness: 0.15,
        });
        const mastMesh = new THREE.Mesh(mastGeo, mastMat);
        mastMesh.position.set(b.x, roofY + mastH / 2, b.z);
        scene.add(mastMesh);

        const beaconGeo = new THREE.SphereGeometry(1.4, 8, 8);
        const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff2244 });
        const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
        beaconMesh.position.set(b.x, roofY + mastH, b.z);
        scene.add(beaconMesh);
      } else if (b.roofStyle === 'chillers') {
        for (let k = -1; k <= 1; k += 2) {
          const chillerGeo = new THREE.BoxGeometry(5.5, 4, 8);
          const chillerMat = new THREE.MeshStandardMaterial({
            color: 0x334155,
            metalness: 0.8,
            roughness: 0.35,
          });
          const chiller = new THREE.Mesh(chillerGeo, chillerMat);
          chiller.position.set(b.x + k * (b.width * 0.22), roofY + 2, b.z);
          scene.add(chiller);
        }
      }

      // Glowing Neon Billboard for resident entity
      if (b.resident) {
        const billboardCanvas = document.createElement('canvas');
        billboardCanvas.width = 512;
        billboardCanvas.height = 140;
        const bctx = billboardCanvas.getContext('2d')!;

        bctx.fillStyle = '#080c10';
        bctx.fillRect(0, 0, 512, 140);
        bctx.strokeStyle = '#d5f36a';
        bctx.lineWidth = 6;
        bctx.strokeRect(5, 5, 502, 130);

        bctx.fillStyle = '#d5f36a';
        bctx.font = 'bold 40px sans-serif';
        bctx.textAlign = 'center';
        bctx.fillText(`@${b.resident.username.toUpperCase()}`, 256, 56);

        bctx.fillStyle = '#38bdf8';
        bctx.font = 'bold 22px monospace';
        bctx.fillText(`★ ${b.resident.followers.toLocaleString()}  |  REPOS: ${b.resident.repos}`, 256, 102);

        const bbTex = new THREE.CanvasTexture(billboardCanvas);
        const signGeo = new THREE.PlaneGeometry(b.width * 0.85, (b.width * 0.85) * (140 / 512));
        const signMat = new THREE.MeshBasicMaterial({ map: bbTex });
        const signMesh = new THREE.Mesh(signGeo, signMat);
        signMesh.position.set(b.x, roofY - 7, b.z + b.depth / 2 + 0.2);
        scene.add(signMesh);
      }
    });

    // 8. Traffic
    const carCount = 70;
    const trafficGeo = new THREE.BoxGeometry(1.6, 0.7, 3.0);
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const trafficMesh = new THREE.InstancedMesh(trafficGeo, headlightMat, carCount);
    trafficMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(trafficMesh);

    const trafficData: { x: number; z: number; speed: number; lane: number; isEastWest: boolean }[] = [];
    const dummy = new THREE.Object3D();

    for (let c = 0; c < carCount; c++) {
      const isEastWest = c % 2 === 0;
      const laneOffset = ((c % 4) - 1.5) * 6;
      const speed = 1.0 + Math.random() * 0.8;
      const avenueIdx = Math.floor(Math.random() * 5) - 2;
      const avenuePos = avenueIdx * 89;

      trafficData.push({
        x: isEastWest ? Math.random() * 800 - 400 : avenuePos + laneOffset,
        z: isEastWest ? avenuePos + laneOffset : Math.random() * 800 - 400,
        speed: laneOffset > 0 ? speed : -speed,
        lane: laneOffset,
        isEastWest,
      });
    }
    trafficRef.current = { mesh: trafficMesh, data: trafficData };

    // 9. Skyward Laser Beacon & Waypoint
    const beaconGroup = new THREE.Group();
    scene.add(beaconGroup);
    beaconGroupRef.current = beaconGroup;

    const laserGeo = new THREE.CylinderGeometry(2.0, 5.0, 700, 16, 1, true);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0xd5f36a,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const laserCylinder = new THREE.Mesh(laserGeo, laserMat);
    laserCylinder.position.y = 350;
    beaconGroup.add(laserCylinder);

    const pulseRings: THREE.Mesh[] = [];
    for (let r = 0; r < 4; r++) {
      const ringGeo = new THREE.RingGeometry(3.5, 7.5, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xd5f36a,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      beaconGroup.add(ring);
      pulseRings.push(ring);
    }
    beaconRingsRef.current = pulseRings;

    const targetRingGeo = new THREE.RingGeometry(18, 22, 48);
    const targetRingMat = new THREE.MeshBasicMaterial({
      color: 0xd5f36a,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const targetRing = new THREE.Mesh(targetRingGeo, targetRingMat);
    targetRing.rotation.x = -Math.PI / 2;
    targetRing.position.y = 0.4;
    beaconGroup.add(targetRing);

    const spot = new THREE.SpotLight(0xd5f36a, 4, 250, 0.4, 0.5, 1);
    spot.castShadow = false;
    scene.add(spot);
    spotLightRef.current = spot;

    // 10. Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildingMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        setHoveredBuilding(hit.userData.building as CityBuildingData);
        container.style.cursor = 'pointer';
      } else {
        setHoveredBuilding(null);
        container.style.cursor = 'default';
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildingMeshes);
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        onSelectBuilding(hit.userData.building as CityBuildingData);
      }
    };

    // Left / Right Scroll & Trackpad horizontal swipe orbit
    const handleWheel = (e: WheelEvent) => {
      // If horizontal scrolling is detected (e.g. 2-finger trackpad swipe left/right or Shift+wheel)
      if (Math.abs(e.deltaX) > 1.2) {
        const cam = cameraRef.current;
        const ctrl = controlsRef.current;
        if (cam && ctrl) {
          const angle = e.deltaX * 0.0035;
          const offset = new THREE.Vector3().subVectors(cam.position, ctrl.target);
          offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
          cam.position.copy(ctrl.target).add(offset);
          cam.lookAt(ctrl.target);
          ctrl.update();
        }
      }
    };
    container.addEventListener('wheel', handleWheel, { passive: true });

    // Keyboard ArrowLeft / ArrowRight navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const cam = cameraRef.current;
      const ctrl = controlsRef.current;
      if (!cam || !ctrl) return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        const offset = new THREE.Vector3().subVectors(cam.position, ctrl.target);
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -0.08);
        cam.position.copy(ctrl.target).add(offset);
        cam.lookAt(ctrl.target);
        ctrl.update();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        const offset = new THREE.Vector3().subVectors(cam.position, ctrl.target);
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.08);
        cam.position.copy(ctrl.target).add(offset);
        cam.lookAt(ctrl.target);
        ctrl.update();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 11. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();
    let lastHudTime = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!activeRef.current) return;

      const elapsedTime = clock.getElapsedTime();
      controls.update();

      if (targetCamPos.current && targetCamLookAt.current) {
        camera.position.lerp(targetCamPos.current, 0.05);
        controls.target.lerp(targetCamLookAt.current, 0.055);

        if (camera.position.distanceTo(targetCamPos.current) < 2) {
          targetCamPos.current = null;
          targetCamLookAt.current = null;
        }
      }

      if (trafficRef.current) {
        const { mesh, data } = trafficRef.current;
        for (let i = 0; i < data.length; i++) {
          const car = data[i];
          if (car.isEastWest) {
            car.x += car.speed;
            if (car.x > 400) car.x = -400;
            if (car.x < -400) car.x = 400;
          } else {
            car.z += car.speed;
            if (car.z > 400) car.z = -400;
            if (car.z < -400) car.z = 400;
          }

          dummy.position.set(car.x, 0.6, car.z);
          dummy.rotation.y = car.isEastWest
            ? car.speed > 0 ? Math.PI / 2 : -Math.PI / 2
            : car.speed > 0 ? 0 : Math.PI;
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      }

      const activeB = selectedBuildingRef.current;
      beaconGroup.visible = Boolean(activeB);

      if (activeB) {
        beaconGroup.position.set(activeB.x, 0, activeB.z);
        laserCylinder.rotation.y += 0.01;

        pulseRings.forEach((ring, idx) => {
          const cycle = (elapsedTime * 0.75 + idx * 0.25) % 1;
          ring.position.y = activeB.height + cycle * 140;
          const s = 1 + cycle * 2.8;
          ring.scale.set(s, s, s);
          (ring.material as THREE.MeshBasicMaterial).opacity = (1 - cycle) * 0.85;
        });

        if (spotLightRef.current) {
          spotLightRef.current.position.set(activeB.x + 40, activeB.height + 60, activeB.z + 40);
          spotLightRef.current.target.position.set(activeB.x, activeB.height * 0.5, activeB.z);
        }

        if (elapsedTime - lastHudTime > 0.03) {
          lastHudTime = elapsedTime;
          const pinnacle = new THREE.Vector3(activeB.x, activeB.height + 12, activeB.z);
          pinnacle.project(camera);
          const sx = ((pinnacle.x + 1) / 2) * container.clientWidth;
          const sy = ((-pinnacle.y + 1) / 2) * container.clientHeight;
          setScreenPos({ x: sx, y: sy, visible: pinnacle.z < 1 });
        }
      }

      if (onCameraUpdate) {
        const angle = Math.atan2(camera.position.x - controls.target.x, camera.position.z - controls.target.z);
        onCameraUpdate({ x: camera.position.x, z: camera.position.z }, angle);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handleClick);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isFullscreen]);

  // Update lighting & sky
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    const toRemove: THREE.Object3D[] = [];
    scene.children.forEach((c) => {
      if (c.name === 'env_light') toRemove.push(c);
    });
    toRemove.forEach((c) => scene.remove(c));

    let skyColor: number;
    let groundColor: number;
    let sunColor: number;
    let sunIntensity: number;
    let fogNear = 350;
    let fogFar = 1600;

    switch (timeOfDay) {
      case 'vice_sunset':
        skyColor = 0x3d1c38;
        groundColor = 0x141018;
        sunColor = 0xff9944;
        sunIntensity = 2.6;
        break;
      case 'neon_night':
        skyColor = 0x07111a;
        groundColor = 0x05090e;
        sunColor = 0x5599ff;
        sunIntensity = 1.4;
        break;
      case 'storm_rain':
        skyColor = 0x182026;
        groundColor = 0x0d1216;
        sunColor = 0x88aacc;
        sunIntensity = 1.5;
        fogNear = 260;
        fogFar = 1200;
        break;
      case 'miami_noon':
      default:
        skyColor = 0x60a5fa;
        groundColor = 0x1e293b;
        sunColor = 0xfffaed;
        sunIntensity = 3.2;
        fogNear = 500;
        fogFar = 2200;
        break;
    }

    scene.fog = new THREE.Fog(skyColor, fogNear, fogFar);
    scene.background = new THREE.Color(skyColor);

    const hemi = new THREE.HemisphereLight(skyColor, groundColor, 1.4);
    hemi.name = 'env_light';
    scene.add(hemi);

    const sun = new THREE.DirectionalLight(sunColor, sunIntensity);
    sun.name = 'env_light';
    sun.position.set(160, 280, 140);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 700;
    const d = 260;
    sun.shadow.camera.left = -d;
    sun.shadow.camera.right = d;
    sun.shadow.camera.top = d;
    sun.shadow.camera.bottom = -d;
    scene.add(sun);
  }, [timeOfDay]);

  // PROPER, BEAUTIFUL CINEMATIC CAMERA FRAMING FOR SELECTED BUILDING
  useEffect(() => {
    if (!selectedBuilding || !cameraRef.current || !controlsRef.current) return;

    const b = selectedBuilding;
    // Calculate generous distance so the ENTIRE tower, base, rooftop helipad, billboard and skyward beacon fit on screen
    const distance = Math.max(130, b.height * 1.35);
    const elevation = b.height * 0.75 + 25;

    // In fullscreen mode, offset target slightly left so the building isn't hidden behind the right drawer!
    const offsetX = isFullscreen ? -18 : 0;

    targetCamPos.current = new THREE.Vector3(
      b.x + distance * 0.75,
      elevation,
      b.z + distance * 0.75
    );
    // Point at 42% height so base and pinnacle are framed with breathing room
    targetCamLookAt.current = new THREE.Vector3(b.x + offsetX, b.height * 0.42, b.z);
  }, [selectedBuilding, isFullscreen]);

  // Camera presets
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const focusX = selectedBuilding?.x || 0;
    const focusZ = selectedBuilding?.z || 0;
    const focusH = selectedBuilding ? selectedBuilding.height : 90;

    switch (cameraMode) {
      case 'birds_eye':
        targetCamPos.current = new THREE.Vector3(focusX, focusH * 2.2 + 240, focusZ + 35);
        targetCamLookAt.current = new THREE.Vector3(focusX, 0, focusZ);
        break;
      case 'street_view':
        targetCamPos.current = new THREE.Vector3(focusX + 45, 6, focusZ + 45);
        targetCamLookAt.current = new THREE.Vector3(focusX, focusH * 0.7, focusZ);
        break;
      case 'cinematic_orbit':
      case 'free_orbit':
      default: {
        const d = Math.max(130, focusH * 1.35);
        const elev = focusH * 0.75 + 25;
        targetCamPos.current = new THREE.Vector3(focusX + d * 0.75, elev, focusZ + d * 0.75);
        targetCamLookAt.current = new THREE.Vector3(focusX, focusH * 0.42, focusZ);
        break;
      }
    }
  }, [cameraMode]);

  // User-friendly zoom controls
  const handleZoomIn = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    const cam = cameraRef.current;
    const target = controlsRef.current.target;
    cam.position.lerp(target, 0.25);
  };

  const handleZoomOut = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    const cam = cameraRef.current;
    const target = controlsRef.current.target;
    const dir = new THREE.Vector3().subVectors(cam.position, target).normalize();
    cam.position.addScaledVector(dir, 45);
  };

  const handleRecenter = () => {
    if (!selectedBuilding) return;
    const b = selectedBuilding;
    const distance = Math.max(130, b.height * 1.35);
    targetCamPos.current = new THREE.Vector3(b.x + distance * 0.75, b.height * 0.75 + 25, b.z + distance * 0.75);
    targetCamLookAt.current = new THREE.Vector3(b.x, b.height * 0.42, b.z);
  };

  const handleOrbitLeft = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;
    const offset = new THREE.Vector3().subVectors(cam.position, ctrl.target);
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -0.2);
    cam.position.copy(ctrl.target).add(offset);
    cam.lookAt(ctrl.target);
    ctrl.update();
  };

  const handleOrbitRight = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;
    const offset = new THREE.Vector3().subVectors(cam.position, ctrl.target);
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.2);
    cam.position.copy(ctrl.target).add(offset);
    cam.lookAt(ctrl.target);
    ctrl.update();
  };

  return (
    <div className={`city-3d-wrapper ${isFullscreen ? 'fullscreen' : ''}`} ref={mountRef}>
      {/* 3D Floating Tag for Highlighted Resident */}
      {selectedBuilding && screenPos.visible && (
        <div
          className="floating-building-hud"
          style={{
            left: `${screenPos.x}px`,
            top: `${screenPos.y}px`,
          }}
        >
          <div className="hud-pin-line" />
          <div className="hud-badge-card">
            <div className="hud-badge-header">
              <span className="hud-live-tag">GTA 6 WAYPOINT</span>
              <span className="hud-dist-tag">{selectedBuilding.district.toUpperCase()}</span>
            </div>
            <div className="hud-badge-body">
              {selectedBuilding.resident && (
                <img
                  src={selectedBuilding.resident.avatarUrl}
                  alt=""
                  className="hud-avatar"
                />
              )}
              <div>
                <div className="hud-title">{selectedBuilding.buildingName}</div>
                <div className="hud-sub">
                  {selectedBuilding.resident ? `@${selectedBuilding.resident.username}` : selectedBuilding.address}
                </div>
              </div>
            </div>
            <div className="hud-badge-footer">
              <span>ELEV: {selectedBuilding.height}M</span>
              <span>FLOORS: {Math.floor(selectedBuilding.height / 3.5)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Hover Tooltip when moving mouse over buildings */}
      {hoveredBuilding && !selectedBuilding && (
        <div className="building-hover-tooltip">
          <b>{hoveredBuilding.buildingName}</b>
          <span>{hoveredBuilding.resident ? `@${hoveredBuilding.resident.username} • ${hoveredBuilding.address}` : hoveredBuilding.address}</span>
        </div>
      )}

      {/* On-Screen Camera Navigation Controls (User-friendly + / - / Rotate / Recenter) */}
      <div className="camera-nav-controls">
        <button onClick={handleZoomIn} title="Zoom In" aria-label="Zoom In">
          <Plus size={16} />
        </button>
        <button onClick={handleZoomOut} title="Zoom Out" aria-label="Zoom Out">
          <Minus size={16} />
        </button>
        <button onClick={handleOrbitLeft} title="Orbit Left (or swipe left / ←)" aria-label="Orbit Left">
          <ChevronLeft size={16} />
        </button>
        <button onClick={handleOrbitRight} title="Orbit Right (or swipe right / →)" aria-label="Orbit Right">
          <ChevronRight size={16} />
        </button>
        {selectedBuilding && (
          <button onClick={handleRecenter} title="Re-center on building" aria-label="Re-center">
            <Crosshair size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
