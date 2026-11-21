# COMMIT CITY (Comity)

> **Transform your GitHub contributions into a living, interactive 3D metropolis.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-black?style=for-the-badge&logo=vercel)](https://comity-seven.vercel.app/)
[![GitHub Stars](https://img.shields.io/github/stars/Deepak-Kambala/Comity?style=for-the-badge&color=d5f36a)](https://github.com/Deepak-Kambala/Comity)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=threedotjs)](https://threejs.org/)

---

[![Commit City 3D Interface](./public/preview.png)](https://comity-seven.vercel.app/)

---

## About

Commit City (Comity) is a high-performance 3D procedural metropolis that maps GitHub profiles and open-source contributions into architectural skyscrapers. Each building's elevation, architectural styling, and zoning reflect real-world developer metrics, accompanied by GTA-style minimap radar telemetry, instant skyscraper pinpointing with skyward beacons, and smooth 60 FPS WebGL navigation.

---

## Live Demo

- **Live Application**: [https://comity-seven.vercel.app/](https://comity-seven.vercel.app/)
- **Repository**: [https://github.com/Deepak-Kambala/Comity](https://github.com/Deepak-Kambala/Comity)

---

## Features

- **Photorealistic 3D Metropolis**:
  - Direct WebGL rendering with `ACESFilmicToneMapping` locked at 60 FPS.
  - Realistic procedural skyscraper architectures with emissive window matrices, illuminated crown billboards, rooftop helipads, and atmospheric linear fog.
  - Expansive coastal ocean plane with night reflection and an 800-star celestial dome.
  - Real-time animated traffic system with directional headlights and taillights.

- **Instant Skyscraper Highlighting**:
  - Search any GitHub username to immediately zoom into their custom building.
  - Custom skyward laser beacon and pulsating ground waypoint ring pinpoint the developer's tower.
  - Building height, floor count, and district zoning are dynamically derived from real repository count and community metrics.

- **GTA-Style Minimap HUD & Navigation**:
  - Live rotating compass radar in the corner with real-time player and waypoint blips.
  - Seamless mouse orbit, two-finger swipe, arrow key (`←` / `→` / `A` / `D`), and on-screen camera controls.
  - Page scroll protection: no wheel hijacking on landing preview.

- **Factual Open Source Titans**:
  - Zero generic lot names. The skyline features factual tech foundations and open-source leaders (Linux Foundation, Meta Open Source, Vercel, Rust Foundation, Kubernetes, Vue, Vite, and more).

- **Automated Live CI Telemetry**:
  - Serverless API route (`/api/github/[username]`) fetching real-time developer profiles, aggregate star counts, and top languages.
  - Scheduled GitHub Actions workflow (`.github/workflows/city-sync.yml`) refreshing telemetry every 6 hours.

- **Real-time Time of Day**:
  - Instant toggle between **Obsidian Midnight** (cyberpunk city lights) and **Miami Noon** (crisp high-noon sunlight).

---

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **3D Engine**: [Three.js](https://threejs.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: Modern CSS with CSS Variables & Glassmorphism

---

## Quick Start (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/Deepak-Kambala/Comity.git
cd Comity
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## Controls

| Action | Control |
| :--- | :--- |
| **Orbit Camera** | Left-click + drag / Two-finger swipe / `←` `→` / `A` `D` |
| **Pan Camera** | Right-click + drag / Two-finger drag |
| **Zoom In / Out** | Mouse wheel (Full map) / `+` `-` buttons on HUD |
| **Re-center on Building** | Crosshair button on HUD |
| **Toggle Day / Night** | Sun / Moon button in top bar |
| **Inspect Skyscraper** | Click any building or radar blip |

---

## License

MIT License © 2026 Deepak Kambala
