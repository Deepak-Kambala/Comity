'use client';

import React, { useState } from 'react';
import {
  X,
  Sun,
  Moon,
  ExternalLink,
  Code2,
  Users,
  Search,
} from 'lucide-react';
import { CityScene3D } from './CityScene3D';
import { GtaRadar } from './GtaRadar';
import { CityBuildingData, TimeOfDay, CameraMode } from '../lib/types';

interface CityMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildings: CityBuildingData[];
  selectedBuilding: CityBuildingData | null;
  onSelectBuilding: (b: CityBuildingData) => void;
  onSearchUser: (username: string) => void;
  searchLoading?: boolean;
}

export function CityMapModal({
  isOpen,
  onClose,
  buildings,
  selectedBuilding,
  onSelectBuilding,
  onSearchUser,
  searchLoading = false,
}: CityMapModalProps) {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('neon_night');
  const [cameraMode, setCameraMode] = useState<CameraMode>('cinematic_orbit');
  const [searchInput, setSearchInput] = useState('');
  const [cameraPos, setCameraPos] = useState<{ x: number; z: number }>({ x: 240, z: 320 });
  const [cameraAngle, setCameraAngle] = useState(0);

  // Lock body scroll while 3D map modal is open
  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleDayNight = () => {
    setTimeOfDay((prev) => (prev === 'neon_night' ? 'miami_noon' : 'neon_night'));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchUser(searchInput.trim());
    }
  };

  return (
    <div className="city-map-modal-backdrop">
      {/* Clean Floating Top Bar */}
      <header className="gta-hud-topbar clean-header">
        <div className="hud-brand clean-brand">
          <span className="hud-logo-title">COMMIT CITY</span>
        </div>

        {/* Minimal Search Input */}
        <form className="hud-search-box clean-search" onSubmit={handleSearchSubmit}>
          <Search size={14} className="hud-search-icon" />
          <input
            type="text"
            placeholder="Search GitHub username..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" disabled={searchLoading}>
            {searchLoading ? '...' : 'FIND'}
          </button>
        </form>

        {/* Minimal Right Actions */}
        <div className="hud-actions clean-actions">
          <button
            className="hud-icon-btn clean-btn"
            onClick={toggleDayNight}
            title={timeOfDay === 'neon_night' ? 'Switch to Daylight' : 'Switch to Midnight'}
          >
            {timeOfDay === 'neon_night' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button className="hud-close-btn clean-close" onClick={onClose} title="Close 3D Map">
            <X size={17} />
          </button>
        </div>
      </header>

      {/* Main 3D Canvas */}
      <div className="modal-canvas-container">
        <CityScene3D
          buildings={buildings}
          selectedBuilding={selectedBuilding}
          onSelectBuilding={onSelectBuilding}
          timeOfDay={timeOfDay}
          cameraMode={cameraMode}
          onCameraUpdate={(pos, angle) => {
            setCameraPos(pos);
            setCameraAngle(angle);
          }}
          isFullscreen={true}
          active={isOpen}
        />
      </div>

      {/* Minimal Radar HUD in Corner */}
      <footer className="gta-hud-bottom clean-bottom">
        <GtaRadar
          buildings={buildings}
          selectedBuilding={selectedBuilding}
          cameraPos={cameraPos}
          cameraAngle={cameraAngle}
          onSelectBuilding={onSelectBuilding}
        />
      </footer>

      {/* Clean Slide-out Detail Drawer */}
      {selectedBuilding && (
        <aside className="building-detail-drawer clean-drawer">
          <div className="drawer-header clean-drawer-header">
            <span className="drawer-kicker">{selectedBuilding.district.toUpperCase()}</span>
            <button className="drawer-close" onClick={() => onSelectBuilding(null as any)}>
              <X size={15} />
            </button>
          </div>

          <div className="drawer-content clean-drawer-content">
            <div className="drawer-profile-top">
              {selectedBuilding.resident && (
                <img
                  src={selectedBuilding.resident.avatarUrl}
                  alt=""
                  className="drawer-avatar clean-avatar"
                />
              )}
              <div className="drawer-profile-text">
                <h3>{selectedBuilding.buildingName}</h3>
                {selectedBuilding.resident && (
                  <a
                    href={`https://github.com/${selectedBuilding.resident.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="drawer-github-link"
                  >
                    @{selectedBuilding.resident.username} <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

            {selectedBuilding.resident?.bio && (
              <p className="drawer-bio clean-bio">{selectedBuilding.resident.bio}</p>
            )}

            {selectedBuilding.resident && (
              <div className="drawer-metrics clean-metrics">
                <div className="metric-box">
                  <Code2 size={15} className="metric-icon" />
                  <div>
                    <span className="metric-value">{selectedBuilding.resident.repos}</span>
                    <span className="metric-label">Repositories</span>
                  </div>
                </div>
                <div className="metric-box">
                  <Users size={15} className="metric-icon" />
                  <div>
                    <span className="metric-value">{selectedBuilding.resident.followers.toLocaleString()}</span>
                    <span className="metric-label">Followers</span>
                  </div>
                </div>
              </div>
            )}

            <div className="building-specs-list clean-specs">
              <div className="spec-row">
                <span>Elevation</span>
                <b>{selectedBuilding.height}m</b>
              </div>
              <div className="spec-row">
                <span>Floors</span>
                <b>{Math.floor(selectedBuilding.height / 3.5)} stories</b>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
