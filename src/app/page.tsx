'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  ArrowDownRight,
  ArrowRight,
  Github,
  MapPin,
  Compass,
  Radio,
} from 'lucide-react';
import { CityBuildingData, GitHubProfile } from '../lib/types';
import { generateCityGrid, synthesizeUserBuilding, FAMOUS_DEVELOPERS, DISTRICTS } from '../lib/cityGenerator';
import { CityMapModal } from '../components/CityMapModal';

// Dynamically import Three.js scene to avoid SSR issues
const CityScene3D = dynamic(
  () => import('../components/CityScene3D').then((mod) => mod.CityScene3D),
  { ssr: false }
);

export default function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapOpen, setMapOpen] = useState(false);

  // Generate initial procedural city grid
  const initialCity = useMemo(() => generateCityGrid(), []);
  const [cityBuildings, setCityBuildings] = useState<CityBuildingData[]>(initialCity.buildings);
  const [selectedBuilding, setSelectedBuilding] = useState<CityBuildingData | null>(
    null
  );

  // Search function that queries GitHub and opens 3D map with highlight
  async function handleSearch(searchName: string) {
    const name = searchName.trim();
    if (!name) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(name)}`, {
        headers: { Accept: 'application/vnd.github+json' },
      });

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'That GitHub username wasn’t found. Please check spelling.'
            : 'GitHub API rate limit or error. Try again in a moment.'
        );
      }

      const profile: GitHubProfile = await response.json();

      // Synthesize user building or find existing
      const { userBuilding, isNewLot } = synthesizeUserBuilding(profile, cityBuildings);

      if (isNewLot) {
        setCityBuildings((prev) => [userBuilding, ...prev]);
      }

      setSelectedBuilding(userBuilding);
      // Automatically open 3D City Map viewer and highlight building!
      setMapOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reach GitHub right now.');
    } finally {
      setLoading(false);
    }
  }

  function onFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSearch(username);
  }

  return (
    <main className="app-shell">
      {/* Top Header */}
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>
            COMMIT<span className="brand-light">CITY</span>
            <small>A LIVING WORLD SHAPED BY CODE</small>
          </span>
        </a>

        <nav>
          <a href="#city">The City</a>
          <a href="#how">How It Works</a>
          <a href="#districts">Districts</a>
        </nav>

        <div className="topbar-right">
          <button
            className="open-3d-btn"
            onClick={() => setMapOpen(true)}
            title="Open Interactive 3D City Map"
          >
            <Compass size={16} />
            <span>OPEN 3D MAP</span>
          </button>
          <a
            className="github-link"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} /> <span>GitHub</span>
            <ArrowDownRight size={14} />
          </a>
        </div>
      </header>

      {/* Hero Section with Live 3D City Preview */}
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            <span className="live-indicator"><span className="pulse-dot" /> REAL-TIME 3D METROPOLIS</span>
            <span className="eyebrow-index">[ OPEN CITY / 3D ]</span>
          </div>

          <h1>
            Your code.<br />
            <span>Your skyline.</span>
          </h1>

          <p className="intro">
            Every repository adds to your address in the city. Search your GitHub username and follow the signal to your building.
          </p>

          {/* Search Form */}
          <form className="search-form" onSubmit={onFormSubmit}>
            <Github size={18} className="search-github" />
            <span className="at-sign">github.com /</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. torvalds, gaearon, shadcn"
              aria-label="GitHub username"
            />
            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="spinner" />
              ) : (
                <ArrowRight size={18} />
              )}
              <span className="button-label">
                {loading ? 'Locating...' : 'Find my building'}
              </span>
            </button>
          </form>

          {error && <p className="search-error">{error}</p>}

          {/* Quick Roster Pills */}
          <div className="quick-roster">
            <span className="quick-roster-label">Popular addresses:</span>
            {FAMOUS_DEVELOPERS.slice(0, 4).map((d) => (
              <button
                key={d.username}
                type="button"
                className="quick-chip"
                onClick={() => {
                  setUsername(d.username);
                  handleSearch(d.username);
                }}
              >
                @{d.username}
              </button>
            ))}
          </div>

          <div className="hero-links">
            <button className="cta-open-map" onClick={() => setMapOpen(true)}>
              <Compass size={16} /> Enter Fullscreen 3D City Map
            </button>
            <span />
            <a href="#districts">
              District Rankings <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* 3D Realistic Cityscape Canvas */}
        <div className="hero-city-preview">
          <div className="preview-canvas-wrapper">
            <CityScene3D
              buildings={cityBuildings}
              selectedBuilding={selectedBuilding}
              active={!mapOpen}
              onSelectBuilding={(b) => {
                setSelectedBuilding(b);
                setMapOpen(true);
              }}
              timeOfDay="vice_sunset"
              cameraMode="cinematic_orbit"
            />
          </div>

          {/* Preview Overlay Badge */}
          <div className="preview-hud-chip" onClick={() => setMapOpen(true)}>
            <Radio size={14} className="radar-icon pulse" />
            <div>
              <span className="ph-title">NIGHTFALL DISTRICT · LIVE MAP</span>
              <span className="ph-sub">Select a tower to inspect its address</span>
            </div>
            <ArrowRight size={14} />
          </div>
        </div>

        <div className="hero-footer">
          <span>THE CITY GROWS WITH EVERY COMMIT</span>
          <span>
            CLICK ANY BUILDING OR SEARCH A DEVELOPER <span className="scroll-line" />
          </span>
        </div>
      </section>

      {/* Marquee Ticker */}
      <section className="ticker" id="city">
        <div className="ticker-inner">
          <span>COMMIT CITY 3D IS LIVE</span>
          <i />
          <span>WET REFLECTIVE ASPHALT & BLOOM LIGHTING</span>
          <i />
          <span>EVERY REPOSITORY ADDS A STORY</span>
          <i />
          <span>STREET TRAFFIC & AVIATION BEACONS</span>
          <i />
          <span>COMMIT CITY 3D IS LIVE</span>
          <i />
        </div>
      </section>

      {/* Below Fold District Architecture Overview */}
      <section className="below-fold" id="how">
        <div className="section-meta">
          <span>01 / ARCHITECTURAL TIERS</span>
          <span>METROPOLITAN GRID CODE</span>
        </div>

        <div className="below-grid">
          <div>
            <h2>
              A place for<br />
              what you <em>build.</em>
            </h2>
            <p>
              Your open source achievements are translated into high-rise architectural engineering. Repositories dictate structural elevation, followers power penthouse luxury and helipads, and your code footprint casts reflections across wet boulevards.
            </p>

            <button className="text-link-btn" onClick={() => setMapOpen(true)}>
              <Compass size={16} /> Launch 3D Radar Navigator <ArrowRight size={15} />
            </button>
          </div>

          {/* Districts List */}
          <div className="districts" id="districts">
            <div className="district-top">
              <span>THE DISTRICTS</span>
              <span>04 SECTORS</span>
            </div>

            {DISTRICTS.map((dist, idx) => (
              <div
                className="district-row interactive"
                key={dist.id}
                onClick={() => {
                  const match = cityBuildings.find((b) => b.district === dist.id);
                  if (match) setSelectedBuilding(match);
                  setMapOpen(true);
                }}
              >
                <span className="district-number">0{idx + 1}</span>
                <div>
                  <b>{dist.name}</b>
                  <small>{dist.subtitle}</small>
                </div>
                <span className="district-count">{dist.coords}</span>
                <ArrowRight size={15} />
              </div>
            ))}

            <div className="district-foot">
              <MapPin size={13} /> DOWNTOWN HIGHWAY OVERPASS & SEA CORRIDOR
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>
            COMMIT<span className="brand-light">CITY</span>
            <small>YOUR CODE BUILDS YOUR SKYLINE</small>
          </span>
        </a>
          <span>AN OPEN WORLD FOR OPEN SOURCE.</span>
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          BACK TO TOP ↑
        </button>
      </footer>

      {/* Fullscreen Interactive 3D City Map Modal */}
      <CityMapModal
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        buildings={cityBuildings}
        selectedBuilding={selectedBuilding}
        onSelectBuilding={(b) => setSelectedBuilding(b)}
        onSearchUser={handleSearch}
        searchLoading={loading}
      />
    </main>
  );
}
