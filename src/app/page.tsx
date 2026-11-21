'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  ArrowDownRight,
  ArrowRight,
  Github,
  Compass,
} from 'lucide-react';
import { CityBuildingData, GitHubProfile } from '../lib/types';
import { generateCityGrid, synthesizeUserBuilding, DISTRICTS } from '../lib/cityGenerator';
import { CityMapModal } from '../components/CityMapModal';

// Dynamically import Three.js scene
const CityScene3D = dynamic(
  () => import('../components/CityScene3D').then((mod) => mod.CityScene3D),
  { ssr: false }
);

export default function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapOpen, setMapOpen] = useState(false);

  // Initial city grid
  const initialCity = useMemo(() => generateCityGrid(), []);
  const [cityBuildings, setCityBuildings] = useState<CityBuildingData[]>(initialCity.buildings);
  const [selectedBuilding, setSelectedBuilding] = useState<CityBuildingData | null>(
    initialCity.buildings[0]
  );

  async function handleSearch(searchName: string) {
    const name = searchName.trim();
    if (!name) return;

    setLoading(true);
    setError('');

    try {
      let resData;
      const localApiRes = await fetch(`/api/github/${encodeURIComponent(name)}`);
      if (localApiRes.ok) {
        resData = await localApiRes.json();
      } else {
        const fallbackRes = await fetch(`https://api.github.com/users/${encodeURIComponent(name)}`, {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!fallbackRes.ok) {
          throw new Error(
            fallbackRes.status === 404
              ? 'That GitHub username wasn’t found.'
              : 'GitHub API rate limit or error.'
          );
        }
        resData = await fallbackRes.json();
      }

      const profile: GitHubProfile = resData;
      const { userBuilding, isNewLot } = synthesizeUserBuilding(profile, cityBuildings);

      if (isNewLot) {
        setCityBuildings((prev) => [userBuilding, ...prev]);
      }

      setSelectedBuilding(userBuilding);
      setMapOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reach GitHub.');
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
      {/* Clean Top Navigation */}
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
          </span>
        </a>

        <div className="topbar-right">
          <button
            className="open-3d-btn"
            onClick={() => setMapOpen(true)}
            title="Open Interactive 3D City Map"
          >
            <Compass size={15} />
            <span>OPEN 3D MAP</span>
          </button>
          <a
            className="github-link"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={15} />
            <span>GitHub</span>
            <ArrowDownRight size={13} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="clean-tagline">
            <span className="pulse-dot" /> 3D OPEN SOURCE SKYLINE
          </div>

          <h1>
            Your code.<br />
            <span>Your skyline.</span>
          </h1>

          <p className="intro">
            Every repository builds your foundation. Enter your GitHub username to locate your 3D skyscraper in the living metropolis.
          </p>

          {/* Search Form */}
          <form className="search-form clean-search-form" onSubmit={onFormSubmit}>
            <Github size={18} className="search-github" />
            <span className="at-sign">github.com /</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              aria-label="GitHub username"
            />
            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="spinner" />
              ) : (
                <ArrowRight size={17} />
              )}
              <span className="button-label">
                {loading ? 'Finding...' : 'Locate Building'}
              </span>
            </button>
          </form>

          {error && <p className="search-error">{error}</p>}

          <div className="hero-links">
            <button className="cta-open-map" onClick={() => setMapOpen(true)}>
              <Compass size={15} /> Open Interactive 3D City Map
            </button>
          </div>
        </div>

        {/* 3D City Preview */}
        <div className="hero-city-preview clean-preview">
          <div className="preview-canvas-wrapper">
            <CityScene3D
              buildings={cityBuildings}
              selectedBuilding={selectedBuilding}
              active={!mapOpen}
              onSelectBuilding={(b) => {
                setSelectedBuilding(b);
                setMapOpen(true);
              }}
              timeOfDay="neon_night"
              cameraMode="cinematic_orbit"
            />
          </div>
        </div>
      </section>

      {/* Clean Districts Grid */}
      <section className="below-fold" id="districts">
        <div className="districts-clean-grid">
          {DISTRICTS.map((dist, idx) => (
            <div
              className="district-card"
              key={dist.id}
              onClick={() => {
                const match = cityBuildings.find((b) => b.district === dist.id);
                if (match) setSelectedBuilding(match);
                setMapOpen(true);
              }}
            >
              <span className="district-idx">0{idx + 1}</span>
              <div>
                <b>{dist.name}</b>
                <small>{dist.subtitle}</small>
              </div>
              <ArrowRight size={14} className="district-arrow" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <span className="footer-title">COMMIT CITY</span>
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
