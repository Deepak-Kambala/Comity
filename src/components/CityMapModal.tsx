'use client';

import React, { useState } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  CloudRain,
  Sunset,
  Camera,
  ExternalLink,
  Code2,
  Users,
  Building2,
  Search,
  Sparkles,
  Maximize2,
  Minimize2,
  Compass,
} from 'lucide-react';
import { CityScene3D } from './CityScene3D';
import { GtaRadar } from './GtaRadar';
import { CityBuildingData, TimeOfDay, CameraMode } from '../lib/types';
import { urbanAudio } from '../lib/audioAmbiance';
import { FACTUAL_CITY_ENTITIES } from '../lib/cityGenerator';

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
  const [audioActive, setAudioActive] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [cameraPos, setCameraPos] = useState<{ x: number; z: number }>({ x: 240, z: 320 });
  const [cameraAngle, setCameraAngle] = useState(0);
  const [cinematicBars, setCinematicBars] = useState(false);

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

  const handleAudioToggle = () => {
    const active = urbanAudio.toggle();
    setAudioActive(active);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchUser(searchInput.trim());
    }
  };

  const currentDistrict = selectedBuilding
    ? selectedBuilding.district.toUpperCase()
    : 'DOWNTOWN METROPOLIS';

  return (
    <div className="city-map-modal-backdrop">
      {/* Cinematic Letterboxing bars */}
      {cinematicBars && (
        <>
          <div className="cinematic-bar bar-top" />
          <div className="cinematic-bar bar-bottom" />
        </>
      )}

      {/* Top HUD Bar */}
      <header className="gta-hud-topbar">
        <div className="hud-brand">
          <div className="hud-logo-mark">CC</div>
          <div>
            <div className="hud-logo-title">COMMIT CITY 3D</div>
            <div className="hud-logo-sub">DISTRICT: {currentDistrict}</div>
          </div>
        </div>

        {/* In-Map Search Input */}
        <form className="hud-search-box" onSubmit={handleSearchSubmit}>
          <Search size={15} className="hud-search-icon" />
          <input
            type="text"
            placeholder="Search GitHub username..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" disabled={searchLoading}>
            {searchLoading ? 'LOCATING...' : 'FLY TO'}
          </button>
        </form>

        {/* Controls Toolbar */}
        <div className="hud-actions">
          {/* Time of Day */}
          <div className="hud-button-group" title="Time of Day">
            <button
              className={timeOfDay === 'vice_sunset' ? 'active' : ''}
              onClick={() => setTimeOfDay('vice_sunset')}
              title="Vice Sunset"
            >
              <Sunset size={15} />
            </button>
            <button
              className={timeOfDay === 'neon_night' ? 'active' : ''}
              onClick={() => setTimeOfDay('neon_night')}
              title="Neon Midnight"
            >
              <Moon size={15} />
            </button>
            <button
              className={timeOfDay === 'storm_rain' ? 'active' : ''}
              onClick={() => setTimeOfDay('storm_rain')}
              title="Wet Rain"
            >
              <CloudRain size={15} />
            </button>
            <button
              className={timeOfDay === 'miami_noon' ? 'active' : ''}
              onClick={() => setTimeOfDay('miami_noon')}
              title="Miami Noon"
            >
              <Sun size={15} />
            </button>
          </div>

          {/* Camera Angles */}
          <div className="hud-button-group" title="Camera Modes">
            <button
              className={cameraMode === 'cinematic_orbit' ? 'active' : ''}
              onClick={() => setCameraMode('cinematic_orbit')}
              title="Cinematic Orbit"
            >
              <Camera size={15} />
            </button>
            <button
              className={cameraMode === 'street_view' ? 'active' : ''}
              onClick={() => setCameraMode('street_view')}
              title="Street Level"
            >
              <Building2 size={15} />
            </button>
            <button
              className={cameraMode === 'birds_eye' ? 'active' : ''}
              onClick={() => setCameraMode('birds_eye')}
              title="Satellite View"
            >
              <Compass size={15} />
            </button>
          </div>

          {/* Audio Synthesizer */}
          <button
            className={`hud-icon-btn ${audioActive ? 'active' : ''}`}
            onClick={handleAudioToggle}
              title={audioActive ? 'Mute City Audio' : 'Play city ambience'}
          >
            {audioActive ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>

          {/* Cinematic Letterbox */}
          <button
            className={`hud-icon-btn ${cinematicBars ? 'active' : ''}`}
            onClick={() => setCinematicBars(!cinematicBars)}
            title="Toggle Cinematic Bars"
          >
            {cinematicBars ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>

          {/* Exit Modal */}
          <button className="hud-close-btn" onClick={onClose} title="Exit 3D City">
            <X size={18} />
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

      {/* Bottom HUD: Radar Minimap & Telemetry */}
      <footer className="gta-hud-bottom">
        <GtaRadar
          buildings={buildings}
          selectedBuilding={selectedBuilding}
          cameraPos={cameraPos}
          cameraAngle={cameraAngle}
          onSelectBuilding={onSelectBuilding}
        />

        {/* Famous Developers Quick Fly-To Bar */}
        <div className="famous-devs-bar">
          <span className="devs-bar-label">
            <Sparkles size={13} /> QUICK FLY TO:
          </span>
          <div className="devs-bar-list">
            {FACTUAL_CITY_ENTITIES.slice(0, 8).map((dev) => (
              <button
                key={dev.username}
                className={`dev-chip ${selectedBuilding?.resident?.username === dev.username ? 'active' : ''}`}
                onClick={() => {
                  const b = buildings.find((x) => x.resident?.username === dev.username);
                  if (b) onSelectBuilding(b);
                  else onSearchUser(dev.username);
                }}
              >
                <img
                  src={`https://avatars.githubusercontent.com/${dev.username}`}
                  alt=""
                  className="dev-chip-avatar"
                />
                <span>@{dev.username}</span>
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* Resident Info Card Overlay */}
      {selectedBuilding && (
        <aside className="building-detail-drawer">
          <div className="drawer-header">
            <div>
              <span className="drawer-kicker">{selectedBuilding.district.toUpperCase()} • {selectedBuilding.category.toUpperCase()}</span>
              <div className="drawer-address">{selectedBuilding.address}</div>
            </div>
            <button className="drawer-close" onClick={() => onSelectBuilding(null as any)}>
              <X size={15} />
            </button>
          </div>

          <div className="drawer-content">
            <div className="drawer-profile-top">
              {selectedBuilding.resident && (
                <img
                  src={selectedBuilding.resident.avatarUrl}
                  alt=""
                  className="drawer-avatar"
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
              <p className="drawer-bio">{selectedBuilding.resident.bio}</p>
            )}

            {/* Key Project Badges */}
            {selectedBuilding.resident?.keyProjects && selectedBuilding.resident.keyProjects.length > 0 && (
              <div className="key-projects-wrapper">
                <span className="key-projects-label">KEY ARCHITECTURES</span>
                <div className="key-projects-list">
                  {selectedBuilding.resident.keyProjects.map((p) => (
                    <span key={p} className="project-pill">{p}</span>
                  ))}
                </div>
              </div>
            )}

            {selectedBuilding.resident && (
              <div className="drawer-metrics">
                <div className="metric-box">
                  <Code2 size={16} className="metric-icon" />
                  <div>
                    <span className="metric-value">{selectedBuilding.resident.repos}</span>
                    <span className="metric-label">Repositories</span>
                  </div>
                </div>
                <div className="metric-box">
                  <Users size={16} className="metric-icon" />
                  <div>
                    <span className="metric-value">{selectedBuilding.resident.followers.toLocaleString()}</span>
                    <span className="metric-label">Followers</span>
                  </div>
                </div>
              </div>
            )}

            <div className="building-specs-list">
              <div className="spec-row">
                <span>Skyscraper Elevation</span>
                <b>{selectedBuilding.height} meters</b>
              </div>
              <div className="spec-row">
                <span>Floors</span>
                <b>{Math.floor(selectedBuilding.height / 3.5)} stories</b>
              </div>
              <div className="spec-row">
                <span>Architecture</span>
                <b className="capitalize">{selectedBuilding.style.replace('_', ' ')}</b>
              </div>
              <div className="spec-row">
                <span>Crown Feature</span>
                <b className="capitalize">{selectedBuilding.roofStyle.replace('_', ' ')}</b>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
