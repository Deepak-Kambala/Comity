'use client';

import React from 'react';
import { CityBuildingData } from '../lib/types';

interface GtaRadarProps {
  buildings: CityBuildingData[];
  selectedBuilding: CityBuildingData | null;
  cameraPos: { x: number; z: number };
  cameraAngle: number;
  onSelectBuilding?: (b: CityBuildingData) => void;
}

export function GtaRadar({
  buildings,
  selectedBuilding,
  cameraPos,
  cameraAngle,
}: GtaRadarProps) {
  // Center map on camera or selected building
  const scale = 0.35; // world units to radar pixels
  const radarRadius = 78;

  return (
    <div className="gta-radar-container">
      {/* Outer compass ring */}
      <div className="radar-bezel">
        <div className="radar-crosshair-h" />
        <div className="radar-crosshair-v" />
        <div className="radar-sweep" />

        {/* Compass Cardinal Points */}
        <span className="compass-dir north" style={{ transform: `rotate(${-cameraAngle}rad) translateY(-68px)` }}>N</span>
        <span className="compass-dir south" style={{ transform: `rotate(${-cameraAngle}rad) translateY(68px)` }}>S</span>
        <span className="compass-dir east" style={{ transform: `rotate(${-cameraAngle}rad) translateX(68px)` }}>E</span>
        <span className="compass-dir west" style={{ transform: `rotate(${-cameraAngle}rad) translateX(-68px)` }}>W</span>

        {/* Radar Map Content */}
        <div
          className="radar-map-plane"
          style={{
            transform: `rotate(${cameraAngle}rad)`,
          }}
        >
          {/* Roads grid on radar */}
          <div className="radar-grid-lines" />

          {/* Building blips */}
          {buildings.map((b) => {
            const rx = (b.x - cameraPos.x) * scale;
            const rz = (b.z - cameraPos.z) * scale;
            const dist = Math.sqrt(rx * rx + rz * rz);
            if (dist > radarRadius - 6) return null;

            const isSelected = selectedBuilding?.id === b.id;
            const isResident = !!b.resident;

            return (
              <div
                key={b.id}
                className={`radar-blip ${isSelected ? 'blip-highlight' : isResident ? 'blip-vip' : ''}`}
                style={{
                  left: `calc(50% + ${rx}px)`,
                  top: `calc(50% + ${rz}px)`,
                }}
              />
            );
          })}

          {/* Waypoint beacon marker for selected building if out of bounds */}
          {selectedBuilding && (() => {
            const rx = (selectedBuilding.x - cameraPos.x) * scale;
            const rz = (selectedBuilding.z - cameraPos.z) * scale;
            const dist = Math.sqrt(rx * rx + rz * rz);
            if (dist > radarRadius - 10) {
              const clampedX = (rx / dist) * (radarRadius - 12);
              const clampedZ = (rz / dist) * (radarRadius - 12);
              return (
                <div
                  className="radar-waypoint-arrow"
                  style={{
                    left: `calc(50% + ${clampedX}px)`,
                    top: `calc(50% + ${clampedZ}px)`,
                  }}
                />
              );
            }
            return null;
          })()}
        </div>

        {/* Center player/camera indicator */}
        <div className="radar-player-marker" />
      </div>

      <div className="radar-telemetry">
        <span className="radar-loc-title">COMMIT CITY GPS</span>
        <span className="radar-loc-coord">
          X: {Math.round(cameraPos.x)} | Z: {Math.round(cameraPos.z)}
        </span>
      </div>
    </div>
  );
}
