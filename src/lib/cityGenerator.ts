import * as THREE from 'three';
import { CityBuildingData, GitHubProfile } from './types';

// Pre-seeded legendary developers in the city
export const FAMOUS_DEVELOPERS = [
  { username: 'torvalds', displayName: 'Linus Torvalds', repos: 7, followers: 235000, bio: 'Creator of Linux & Git. The Godfather of Open Source.' },
  { username: 'shadcn', displayName: 'shadcn', repos: 38, followers: 98000, bio: 'Creator of shadcn/ui. Transforming web interfaces.' },
  { username: 'gaearon', displayName: 'Dan Abramov', repos: 275, followers: 89000, bio: 'Co-author of Redux, React core team alumni.' },
  { username: 'yyx990803', displayName: 'Evan You', repos: 190, followers: 104000, bio: 'Creator of Vue.js & Vite.' },
  { username: 'rauchg', displayName: 'Guillermo Rauch', repos: 240, followers: 72000, bio: 'CEO of Vercel, creator of Next.js & Socket.io.' },
  { username: 'antfu', displayName: 'Anthony Fu', repos: 480, followers: 64000, bio: 'Vue / Vite / Nuxt core team, prolific OSS builder.' },
  { username: 'sindresorhus', displayName: 'Sindre Sorhus', repos: 1100, followers: 62000, bio: 'Prolific open source maintainer & full-time maker.' },
];

export const DISTRICTS = [
  { id: 'starter', name: 'Starter Shores', subtitle: 'Where Every Journey Begins', color: '#68d391', coords: '25° 46′ N, 80° 11′ W' },
  { id: 'developer', name: 'Silicon Waterfront', subtitle: 'The Creative Engine Room', color: '#63b3ed', coords: '25° 47′ N, 80° 12′ W' },
  { id: 'enterprise', name: 'Metropolis Core', subtitle: 'Built To Move The World', color: '#b794f4', coords: '25° 48′ N, 80° 10′ W' },
  { id: 'legend', name: 'Apex District', subtitle: 'For Giants Who Built The Web', color: '#f6e05e', coords: '25° 49′ N, 80° 11′ W' },
];

// High-resolution clean asphalt road texture
export function createAsphaltTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Smooth dark asphalt with high contrast
  ctx.fillStyle = '#181c1f';
  ctx.fillRect(0, 0, 512, 1024);

  // Subtle grain
  ctx.fillStyle = 'rgba(255,255,255,0.02)';
  for (let i = 0; i < 4000; i++) {
    const rx = Math.random() * 512;
    const ry = Math.random() * 1024;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Double Solid Yellow Center Line
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 6;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(250, 0);
  ctx.lineTo(250, 1024);
  ctx.moveTo(262, 0);
  ctx.lineTo(262, 1024);
  ctx.stroke();

  // Crisp White Dashed Lane Lines
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;
  ctx.setLineDash([35, 45]);
  ctx.beginPath();
  ctx.moveTo(125, 0);
  ctx.lineTo(125, 1024);
  ctx.moveTo(387, 0);
  ctx.lineTo(387, 1024);
  ctx.stroke();

  // White Edge Solid Lines
  ctx.setLineDash([]);
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(20, 1024);
  ctx.moveTo(492, 0);
  ctx.lineTo(492, 1024);
  ctx.stroke();

  // Clean Zebra Crosswalk at top
  ctx.fillStyle = '#f8fafc';
  for (let y = 30; y < 140; y += 22) {
    ctx.fillRect(35, y, 442, 12);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  return texture;
}

// Clean Sidewalk Pavers
export function createSidewalkTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#2b3135';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = '#1e2326';
  ctx.lineWidth = 2;
  const step = 32;
  for (let x = 0; x <= 256; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }
  for (let y = 0; y <= 256; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  // Curb border
  ctx.fillStyle = '#475156';
  ctx.fillRect(0, 0, 256, 8);
  ctx.fillRect(0, 248, 256, 8);
  ctx.fillRect(0, 0, 8, 256);
  ctx.fillRect(248, 0, 8, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Ultra-realistic Skyscraper Curtain-Wall & Window Texture
export function createWindowTexture(
  type: 'office' | 'glass_tech' | 'cyber',
  hue: number = 210
): { diffuse: THREE.CanvasTexture; emissive: THREE.CanvasTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Emissive canvas for glowing windows
  const eCanvas = document.createElement('canvas');
  eCanvas.width = 512;
  eCanvas.height = 1024;
  const eCtx = eCanvas.getContext('2d')!;

  // Dark reflective glass base
  ctx.fillStyle = '#10171d';
  ctx.fillRect(0, 0, 512, 1024);

  eCtx.fillStyle = '#000000';
  eCtx.fillRect(0, 0, 512, 1024);

  const cols = type === 'glass_tech' ? 16 : 12;
  const rows = 32;
  const colW = 512 / cols;
  const rowH = 1024 / rows;

  let seed = (hue * 97 + type.length * 7919) >>> 0;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  for (let r = 0; r < rows; r++) {
    // Structural steel floor spandrel
    ctx.fillStyle = '#1f272e';
    ctx.fillRect(0, r * rowH, 512, 4);

    for (let c = 0; c < cols; c++) {
      const x = c * colW + 2;
      const y = r * rowH + 5;
      const w = colW - 4;
      const h = rowH - 8;

      const isLit = random() > 0.38;

      if (isLit) {
        const randTemp = random();
        let lightCol: string;
        let emitCol: string;

        if (randTemp < 0.52) {
          // Warm luxurious incandescent (Penthouse / Executive office)
          const lgt = 65 + random() * 20;
          lightCol = `hsl(${38 + random() * 10}, 95%, ${lgt}%)`;
          emitCol = `hsl(${38 + random() * 10}, 95%, 55%)`;
        } else if (randTemp < 0.88) {
          // Clean modern tech white (6000K)
          const lgt = 75 + random() * 15;
          lightCol = `hsl(${210 + random() * 15}, 60%, ${lgt}%)`;
          emitCol = `hsl(${210 + random() * 15}, 70%, 65%)`;
        } else {
          // Vibrant cyan/neon accent
          lightCol = `hsl(${hue}, 90%, 70%)`;
          emitCol = `hsl(${hue}, 95%, 60%)`;
        }

        ctx.fillStyle = lightCol;
        ctx.fillRect(x, y, w, h);

        eCtx.fillStyle = emitCol;
        eCtx.fillRect(x, y, w, h);

        // Blinds / room silhouette
        if (random() > 0.45) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
          const bH = random() * (h * 0.65);
          ctx.fillRect(x, y, w, bH);
          eCtx.fillStyle = '#000000';
          eCtx.fillRect(x, y, w, bH);
        }
      } else {
        // Deep tinted dark reflective glass
        ctx.fillStyle = '#0d1318';
        ctx.fillRect(x, y, w, h);
      }

      // Metal window mullions
      ctx.strokeStyle = '#182128';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, w, h);
    }
  }

  const diffuse = new THREE.CanvasTexture(canvas);
  diffuse.wrapS = THREE.RepeatWrapping;
  diffuse.wrapT = THREE.RepeatWrapping;

  const emissive = new THREE.CanvasTexture(eCanvas);
  emissive.wrapS = THREE.RepeatWrapping;
  emissive.wrapT = THREE.RepeatWrapping;

  return { diffuse, emissive };
}

// Helipad rooftop texture
export function createHelipadTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1e2428';
  ctx.fillRect(0, 0, 512, 512);

  // Outer safety ring
  ctx.strokeStyle = '#d5f36a';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(256, 256, 215, 0, Math.PI * 2);
  ctx.stroke();

  // White inner circle
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(256, 256, 180, 0, Math.PI * 2);
  ctx.stroke();

  // Helipad "H"
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 220px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('H', 256, 256);

  // Red corner hazard beacons
  ctx.fillStyle = '#ff2b3d';
  const corners = [
    [45, 45],
    [467, 45],
    [45, 467],
    [467, 467],
  ];
  for (const [cx, cy] of corners) {
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Generate the procedural city grid
export function generateCityGrid(): {
  buildings: CityBuildingData[];
  roadWidth: number;
  blockSize: number;
  gridSpan: number;
} {
  const buildings: CityBuildingData[] = [];
  const gridSpan = 7; // 7x7 blocks
  const blockSize = 65;
  const roadWidth = 24;

  let devIndex = 0;

  for (let gx = -3; gx <= 3; gx++) {
    for (let gz = -3; gz <= 3; gz++) {
      const centerX = gx * (blockSize + roadWidth);
      const centerZ = gz * (blockSize + roadWidth);
      const distFromCenter = Math.sqrt(gx * gx + gz * gz);

      let district = 'developer';
      let tier: 'starter' | 'developer' | 'enterprise' | 'legend' = 'developer';

      if (distFromCenter <= 1.2) {
        district = 'legend';
        tier = 'legend';
      } else if (gx > 0 && gz >= 0) {
        district = 'enterprise';
        tier = 'enterprise';
      } else if (gx <= 0 && gz <= 0) {
        district = 'starter';
        tier = 'starter';
      } else {
        district = 'developer';
        tier = 'developer';
      }

      // Central apex block (Linus Torvalds landmark skyscraper)
      if (distFromCenter === 0) {
        const height = 240;
        const res = devIndex < FAMOUS_DEVELOPERS.length ? FAMOUS_DEVELOPERS[devIndex++] : undefined;
        buildings.push({
          id: `b_apex_${gx}_${gz}`,
          gridX: gx,
          gridZ: gz,
          x: centerX,
          z: centerZ,
          width: 48,
          depth: 48,
          height,
          style: 'spire',
          roofStyle: 'helipad',
          primaryColor: '#2b3644',
          windowHue: 45,
          district: 'legend',
          tier: 'legend',
          resident: res
            ? {
                username: res.username,
                displayName: res.displayName,
                avatarUrl: `https://avatars.githubusercontent.com/${res.username}`,
                repos: res.repos,
                followers: res.followers,
                bio: res.bio,
              }
            : undefined,
        });
        continue;
      }

      // Sub-lots in each block
      const subLots = [
        { offsetX: -16, offsetZ: -16, w: 26, d: 26 },
        { offsetX: 16, offsetZ: -16, w: 26, d: 26 },
        { offsetX: -16, offsetZ: 16, w: 26, d: 26 },
        { offsetX: 16, offsetZ: 16, w: 26, d: 26 },
      ];

      subLots.forEach((lot, i) => {
        const baseH = Math.max(45, 175 - distFromCenter * 32);
        const height = baseH + ((Math.abs(gx * 17 + gz * 23 + i * 11) % 60) - 20);
        const w = lot.w + (Math.sin(gx + i) * 5);
        const d = lot.d + (Math.cos(gz + i) * 5);

        const styles: ('glass_tower' | 'stepped_artdeco' | 'monolith' | 'cyber_complex' | 'spire')[] = [
          'glass_tower',
          'stepped_artdeco',
          'monolith',
          'cyber_complex',
          'spire',
        ];
        const style = styles[(Math.abs(gx * 3 + gz * 5 + i)) % styles.length];

        const roofStyles: ('helipad' | 'antenna' | 'chillers' | 'spire_crown' | 'penthouse')[] = [
          'helipad',
          'antenna',
          'chillers',
          'spire_crown',
          'penthouse',
        ];
        const roofStyle = roofStyles[(Math.abs(gx * 7 + gz * 2 + i * 3)) % roofStyles.length];

        const hues = [35, 195, 220, 160, 275, 45];
        const windowHue = hues[(gx + 3 + gz + 3 + i) % hues.length];

        let resident = undefined;
        if (devIndex < FAMOUS_DEVELOPERS.length && (i === 0 || distFromCenter <= 1.8)) {
          const dev = FAMOUS_DEVELOPERS[devIndex++];
          resident = {
            username: dev.username,
            displayName: dev.displayName,
            avatarUrl: `https://avatars.githubusercontent.com/${dev.username}`,
            repos: dev.repos,
            followers: dev.followers,
            bio: dev.bio,
          };
        }

        buildings.push({
          id: `b_${gx}_${gz}_${i}`,
          gridX: gx,
          gridZ: gz,
          x: centerX + lot.offsetX,
          z: centerZ + lot.offsetZ,
          width: Math.max(22, w),
          depth: Math.max(22, d),
          height: Math.max(48, height),
          style,
          roofStyle,
          primaryColor: ['#1e252d', '#252e2a', '#2d262e', '#232b35', '#2c2d28'][(i + gx) % 5],
          windowHue,
          district,
          tier,
          resident,
        });
      });
    }
  }

  return { buildings, roadWidth, blockSize, gridSpan };
}

// Synthesize or locate user skyscraper
export function synthesizeUserBuilding(
  profile: GitHubProfile,
  allBuildings: CityBuildingData[]
): { userBuilding: CityBuildingData; isNewLot: boolean } {
  const existing = allBuildings.find(
    (b) => b.resident?.username.toLowerCase() === profile.login.toLowerCase()
  );
  if (existing) {
    return { userBuilding: existing, isNewLot: false };
  }

  const repos = profile.public_repos || 0;
  const followers = profile.followers || 0;

  let tier: 'starter' | 'developer' | 'enterprise' | 'legend' = 'starter';
  let height = 80 + Math.min(220, Math.sqrt(repos) * 16 + Math.log10(Math.max(1, followers)) * 28);
  let district = 'starter';

  if (followers > 5000 || repos > 150) {
    tier = 'legend';
    district = 'legend';
    height = Math.max(195, height);
  } else if (followers > 500 || repos > 50) {
    tier = 'enterprise';
    district = 'enterprise';
    height = Math.max(145, height);
  } else if (followers > 50 || repos > 10) {
    tier = 'developer';
    district = 'developer';
    height = Math.max(105, height);
  }

  const hash = profile.login.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const targetX = ((hash % 5) - 2) * 89 + (hash % 15) - 7;
  const targetZ = (((hash * 7) % 5) - 2) * 89 + ((hash * 13) % 15) - 7;

  const userBuilding: CityBuildingData = {
    id: `user_tower_${profile.login}`,
    gridX: 0,
    gridZ: 0,
    x: targetX,
    z: targetZ,
    width: 38 + Math.min(18, Math.log10(Math.max(1, followers + 1)) * 5),
    depth: 38 + Math.min(18, Math.log10(Math.max(1, repos + 1)) * 5),
    height: Math.round(height),
    style: followers > 1000 ? 'spire' : repos > 30 ? 'glass_tower' : 'cyber_complex',
    roofStyle: followers > 200 ? 'helipad' : 'spire_crown',
    primaryColor: '#1c2833',
    windowHue: (hash * 37) % 360,
    district,
    tier,
    resident: {
      username: profile.login,
      displayName: profile.name || profile.login,
      avatarUrl: profile.avatar_url,
      repos: profile.public_repos,
      followers: profile.followers,
      bio: profile.bio,
    },
  };

  return { userBuilding, isNewLot: true };
}
