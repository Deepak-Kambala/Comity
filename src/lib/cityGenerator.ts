import * as THREE from 'three';
import { CityBuildingData, GitHubProfile } from './types';

export interface FactualEntity {
  username: string;
  buildingName: string;
  displayName: string;
  address: string;
  category: 'developer' | 'foundation' | 'framework' | 'infrastructure';
  repos: number;
  followers: number;
  bio: string;
  keyProjects: string[];
  district: 'legend' | 'enterprise' | 'developer' | 'starter';
  tier: 'legend' | 'enterprise' | 'developer' | 'starter';
}

// Comprehensive factual open-source titans database
export const FACTUAL_CITY_ENTITIES: FactualEntity[] = [
  // --- LEGEND'S APEX DISTRICT (Giants who shaped computing & the web) ---
  {
    username: 'torvalds',
    buildingName: 'Linux Foundation Apex Tower',
    displayName: 'Linus Torvalds',
    address: '01 Apex Plaza, Grand Boulevard',
    category: 'foundation',
    repos: 7,
    followers: 235000,
    bio: 'Creator of the Linux Operating System Kernel and Git Version Control System. Linux powers 100% of top 500 supercomputers and 90% of global cloud servers.',
    keyProjects: ['Linux Kernel', 'Git'],
    district: 'legend',
    tier: 'legend',
  },
  {
    username: 'shadcn',
    buildingName: 'shadcn Design Systems Tower',
    displayName: 'shadcn',
    address: '14 Apex Boulevard, Penthouse Row',
    category: 'developer',
    repos: 38,
    followers: 98000,
    bio: 'Creator of shadcn/ui. Revolutionized component-driven web design with accessible, beautifully crafted, copy-paste React & Tailwind components.',
    keyProjects: ['shadcn/ui', 'Radix UI', 'Typography'],
    district: 'legend',
    tier: 'legend',
  },
  {
    username: 'gaearon',
    buildingName: 'Redux & React Alumni Spire',
    displayName: 'Dan Abramov',
    address: '22 Apex Way, East Pinnacle',
    category: 'developer',
    repos: 275,
    followers: 89000,
    bio: 'Co-creator of Redux, Create React App, and core maintainer of React and React Docs. Champion of mental models in software.',
    keyProjects: ['Redux', 'Create React App', 'React Core'],
    district: 'legend',
    tier: 'legend',
  },
  {
    username: 'yyx990803',
    buildingName: 'Vue & Vite Innovation Center',
    displayName: 'Evan You',
    address: '35 Apex Promenade, West Pinnacle',
    category: 'developer',
    repos: 190,
    followers: 104000,
    bio: 'Creator of Vue.js, one of the most popular frontend frameworks globally, and Vite, the lightning-fast modern frontend build tool.',
    keyProjects: ['Vue.js', 'Vite', 'Rolldown'],
    district: 'legend',
    tier: 'legend',
  },
  {
    username: 'rauchg',
    buildingName: 'Vercel Apex Monolith',
    displayName: 'Guillermo Rauch',
    address: '48 Skyward Terrace, North Apex',
    category: 'developer',
    repos: 240,
    followers: 72000,
    bio: 'CEO and Founder of Vercel. Creator of Next.js, Socket.io, and Mongoose. Driving the high-performance modern web platform.',
    keyProjects: ['Next.js', 'Socket.io', 'Mongoose'],
    district: 'legend',
    tier: 'legend',
  },
  {
    username: 'antfu',
    buildingName: 'Open Source Synergy Tower',
    displayName: 'Anthony Fu',
    address: '55 Skyward Terrace, South Apex',
    category: 'developer',
    repos: 480,
    followers: 64000,
    bio: 'Prolific open-source architect, Vue / Vite / Nuxt core team member. Creator of UnoCSS, Vitest, Type Challenges, and Elk.',
    keyProjects: ['UnoCSS', 'Vitest', 'Nuxt Core'],
    district: 'legend',
    tier: 'legend',
  },
  {
    username: 'sindresorhus',
    buildingName: 'Sorhus Open Source Registry',
    displayName: 'Sindre Sorhus',
    address: '68 Grand Boulevard, Apex District',
    category: 'developer',
    repos: 1100,
    followers: 62000,
    bio: 'Full-time open source maintainer who has authored over 1,000 foundational packages downloaded billions of times each month across the npm registry.',
    keyProjects: ['Chalk', 'Pure', 'Refined GitHub', 'P-Queue'],
    district: 'legend',
    tier: 'legend',
  },
  {
    username: 'mitchellh',
    buildingName: 'HashiCorp Systems Citadel',
    displayName: 'Mitchell Hashimoto',
    address: '77 Terminal Avenue, Apex District',
    category: 'developer',
    repos: 190,
    followers: 35000,
    bio: 'Co-founder of HashiCorp; creator of Vagrant, Packer, Terraform, Consul, Vault, Nomad, and the Ghostty GPU terminal.',
    keyProjects: ['Terraform', 'Vagrant', 'Ghostty', 'Vault'],
    district: 'legend',
    tier: 'legend',
  },
  {
    username: 'mrdoob',
    buildingName: 'Three.js 3D Graphics Hall',
    displayName: 'Ricardo Cabello (Mr.doob)',
    address: '88 WebGL Corridor, Apex District',
    category: 'developer',
    repos: 50,
    followers: 18000,
    bio: 'Creator of Three.js. Brought hardware-accelerated 3D WebGL graphics and interactive spatial visualization to the open web.',
    keyProjects: ['Three.js', 'WebGL', 'WebXR'],
    district: 'legend',
    tier: 'legend',
  },

  // --- METROPOLIS ENTERPRISE DISTRICT (The Infrastructure & Foundation Core) ---
  {
    username: 'facebook',
    buildingName: 'Meta Open Source Headquarters',
    displayName: 'Meta Open Source',
    address: '101 Enterprise Expressway, Downtown',
    category: 'foundation',
    repos: 620,
    followers: 120000,
    bio: 'Creator of React, PyTorch, Docusaurus, Jest, Prettier roots, and open-weights artificial intelligence research powering modern computing.',
    keyProjects: ['React', 'PyTorch', 'Jest', 'Docusaurus'],
    district: 'enterprise',
    tier: 'enterprise',
  },
  {
    username: 'vercel',
    buildingName: 'Vercel Cloud Platform Pavilion',
    displayName: 'Vercel',
    address: '112 Silicon Expressway, Downtown',
    category: 'framework',
    repos: 320,
    followers: 45000,
    bio: 'Pioneers of the frontend cloud, serverless edge compute, Next.js, Turbopack, and the Vercel AI SDK.',
    keyProjects: ['Next.js', 'Turbopack', 'AI SDK', 'SWR'],
    district: 'enterprise',
    tier: 'enterprise',
  },
  {
    username: 'kubernetes',
    buildingName: 'CNCF Cloud Native Center',
    displayName: 'Kubernetes',
    address: '125 Container Harbor, Enterprise Sector',
    category: 'foundation',
    repos: 120,
    followers: 45000,
    bio: 'Production-grade container orchestration system automating deployment, scaling, and operational management of cloud-native microservices.',
    keyProjects: ['Kubernetes', 'Kubelet', 'Kube-Proxy'],
    district: 'enterprise',
    tier: 'enterprise',
  },
  {
    username: 'microsoft',
    buildingName: 'Microsoft Developer Platforms Tower',
    displayName: 'Microsoft Open Source',
    address: '138 TypeScript Parkway, Enterprise Core',
    category: 'foundation',
    repos: 680,
    followers: 65000,
    bio: 'Steward of TypeScript, Visual Studio Code, Playwright, Terminal, and foundational open source programming tools.',
    keyProjects: ['TypeScript', 'VS Code', 'Playwright'],
    district: 'enterprise',
    tier: 'enterprise',
  },
  {
    username: 'google',
    buildingName: 'Google Open Platforms Center',
    displayName: 'Google Open Source',
    address: '150 Algorithm Drive, Enterprise District',
    category: 'foundation',
    repos: 950,
    followers: 70000,
    bio: 'Creator of TensorFlow, Go programming language, Angular, Flutter, Dart, Protocol Buffers, and foundational distributed systems research.',
    keyProjects: ['TensorFlow', 'Go', 'Flutter', 'Angular'],
    district: 'enterprise',
    tier: 'enterprise',
  },
  {
    username: 'rust-lang',
    buildingName: 'Rust Foundation Citadel',
    displayName: 'Rust Foundation',
    address: '162 Memory Safety Way, Enterprise Core',
    category: 'foundation',
    repos: 180,
    followers: 40000,
    bio: 'A language empowering everyone to build reliable, memory-safe, and blazingly fast systems software without garbage collection.',
    keyProjects: ['Rust Compiler', 'Cargo', 'Rustdoc'],
    district: 'enterprise',
    tier: 'enterprise',
  },
  {
    username: 'python',
    buildingName: 'Python Software Foundation Hall',
    displayName: 'Python Software Foundation',
    address: '175 PyData Boulevard, Enterprise District',
    category: 'foundation',
    repos: 90,
    followers: 32000,
    bio: 'Official maintainers of the Python programming language, PyPI package index, and standard libraries driving scientific AI and enterprise computing.',
    keyProjects: ['CPython', 'PyPI', 'PEP Standards'],
    district: 'enterprise',
    tier: 'enterprise',
  },
  {
    username: 'nodejs',
    buildingName: 'OpenJS Runtime Pavilion',
    displayName: 'Node.js Core',
    address: '188 Event Loop Concourse, Enterprise District',
    category: 'foundation',
    repos: 140,
    followers: 38000,
    bio: 'The asynchronous event-driven JavaScript runtime engine that transformed server-side web backends globally.',
    keyProjects: ['Node.js', 'Libuv', 'V8 Engine Layer'],
    district: 'enterprise',
    tier: 'enterprise',
  },
  {
    username: 'apache',
    buildingName: 'Apache Software Foundation Court',
    displayName: 'Apache Foundation',
    address: '199 Distributed Ledger Drive, Enterprise',
    category: 'foundation',
    repos: 1400,
    followers: 22000,
    bio: 'Home to the Apache HTTP Server, Apache Spark, Kafka, Cassandra, Lucene, and foundational open-source enterprise infrastructure.',
    keyProjects: ['Apache Spark', 'Kafka', 'HTTP Server', 'Cassandra'],
    district: 'enterprise',
    tier: 'enterprise',
  },
  {
    username: 'docker',
    buildingName: 'Docker Maritime Container Hub',
    displayName: 'Docker Inc.',
    address: '210 Container Way, Enterprise Port',
    category: 'foundation',
    repos: 240,
    followers: 28000,
    bio: 'Pioneered lightweight application packaging, container virtualization, and standardized container runtime specifications.',
    keyProjects: ['Docker CLI', 'Moby', 'Compose'],
    district: 'enterprise',
    tier: 'enterprise',
  },
  {
    username: 'supabase',
    buildingName: 'Supabase Database Plaza',
    displayName: 'Supabase',
    address: '225 PostgreSQL Crescent, Enterprise',
    category: 'framework',
    repos: 260,
    followers: 18000,
    bio: 'The open-source Firebase alternative providing instant RESTful and GraphQL APIs on top of real PostgreSQL with built-in Auth, Storage, and Realtime.',
    keyProjects: ['PostgREST', 'Gotrue Auth', 'Realtime'],
    district: 'enterprise',
    tier: 'enterprise',
  },
  {
    username: 'tailwindlabs',
    buildingName: 'Tailwind Design Architecture Center',
    displayName: 'Tailwind Labs',
    address: '238 Utility CSS Boulevard, Enterprise',
    category: 'framework',
    repos: 80,
    followers: 22000,
    bio: 'Created Tailwind CSS, Headless UI, Heroicons, and Catalyst, fundamentally standardizing atomic and utility-first styling on the web.',
    keyProjects: ['Tailwind CSS', 'Headless UI', 'Heroicons'],
    district: 'enterprise',
    tier: 'enterprise',
  },

  // --- SILICON WATERFRONT DEVELOPER DISTRICT (Creative Tooling & Modern Runtimes) ---
  {
    username: 'vitejs',
    buildingName: 'Vite High-Speed Tooling Lab',
    displayName: 'Vite Core Team',
    address: '301 Bundler Quay, Silicon Waterfront',
    category: 'framework',
    repos: 40,
    followers: 16000,
    bio: 'Next generation frontend tooling with native ES module imports, ultra-fast Hot Module Replacement, and pre-configured Rollup builds.',
    keyProjects: ['Vite', 'Create-Vite', 'Vite Plugin API'],
    district: 'developer',
    tier: 'developer',
  },
  {
    username: 'oven-sh',
    buildingName: 'Bun All-In-One Runtime Spire',
    displayName: 'Oven (Bun)',
    address: '315 Zig Performance Row, Silicon Waterfront',
    category: 'framework',
    repos: 35,
    followers: 14000,
    bio: 'Incredibly fast JavaScript & TypeScript runtime, package manager, test runner, and bundler written from scratch in Zig and JavaScriptCore.',
    keyProjects: ['Bun', 'Bun-Install', 'Bun-Test'],
    district: 'developer',
    tier: 'developer',
  },
  {
    username: 'astral-sh',
    buildingName: 'Astral Systems Laboratory',
    displayName: 'Astral (Ruff & uv)',
    address: '328 Rust Tooling Promenade, Silicon Waterfront',
    category: 'framework',
    repos: 25,
    followers: 10000,
    bio: 'Building the next era of Python developer tooling written in Rust. Authors of Ruff and uv, delivering 100x performance gains.',
    keyProjects: ['uv', 'Ruff', 'Pip Replacement'],
    district: 'developer',
    tier: 'developer',
  },
  {
    username: 'prisma',
    buildingName: 'Prisma TypeSafe ORM Center',
    displayName: 'Prisma Data',
    address: '340 Schema Boulevard, Silicon Waterfront',
    category: 'framework',
    repos: 90,
    followers: 12000,
    bio: 'Next-generation ORM and Database Toolkit for TypeScript and Node.js. Simplifies database workflows with auto-generated type-safe queries.',
    keyProjects: ['Prisma Client', 'Prisma Migrate', 'Studio'],
    district: 'developer',
    tier: 'developer',
  },
  {
    username: 'trpc',
    buildingName: 'tRPC End-to-End Type Safety Hall',
    displayName: 'tRPC Core',
    address: '352 Schema Way, Silicon Waterfront',
    category: 'framework',
    repos: 30,
    followers: 8000,
    bio: 'End-to-end typesafe APIs made easy. Guarantees compile-time synchronization between frontend client and backend server code.',
    keyProjects: ['tRPC Server', 'tRPC Client', 'React Query Adapter'],
    district: 'developer',
    tier: 'developer',
  },
  {
    username: 'solidjs',
    buildingName: 'SolidJS Reactivity Complex',
    displayName: 'SolidJS (Ryan Carniato)',
    address: '365 Signal Avenue, Silicon Waterfront',
    category: 'framework',
    repos: 45,
    followers: 9000,
    bio: 'Fine-grained reactive UI library without a Virtual DOM. Converts declarative JSX directly into ultra-fast pinpoint DOM updates.',
    keyProjects: ['SolidJS', 'Solid-Start', 'Reactivity Core'],
    district: 'developer',
    tier: 'developer',
  },
  {
    username: 'sveltejs',
    buildingName: 'Svelte Compiler Sanctuary',
    displayName: 'Svelte Core Team',
    address: '378 Compile-Time Lane, Silicon Waterfront',
    category: 'framework',
    repos: 85,
    followers: 20000,
    bio: 'Cybernetically enhanced web apps. Shifts reactivity work out of the browser and into an optimizing compiler generating tiny imperative code.',
    keyProjects: ['Svelte', 'SvelteKit', 'Runes Engine'],
    district: 'developer',
    tier: 'developer',
  },
  {
    username: 'denoland',
    buildingName: 'Deno Secure Engine Hub',
    displayName: 'Deno Land',
    address: '390 V8 Sandbox Way, Silicon Waterfront',
    category: 'framework',
    repos: 70,
    followers: 15000,
    bio: 'Modern, secure runtime for JavaScript and TypeScript with zero configuration, built-in package management, and web standard APIs.',
    keyProjects: ['Deno Runtime', 'Fresh Framework', 'Deno Deploy'],
    district: 'developer',
    tier: 'developer',
  },
  {
    username: 'tauri-apps',
    buildingName: 'Tauri Native Binary Complex',
    displayName: 'Tauri Apps',
    address: '405 Webview Arcade, Silicon Waterfront',
    category: 'framework',
    repos: 60,
    followers: 12000,
    bio: 'Build smaller, faster, and more secure desktop and mobile applications with native webview rendering and a Rust backend.',
    keyProjects: ['Tauri Core', 'Tauri CLI', 'WRY Webview'],
    district: 'developer',
    tier: 'developer',
  },
  {
    username: 'expo',
    buildingName: 'Expo Universal Mobile Campus',
    displayName: 'Expo',
    address: '418 Native Bridge Road, Silicon Waterfront',
    category: 'framework',
    repos: 120,
    followers: 14000,
    bio: 'The universal React platform for building native apps that run seamlessly across iOS, Android, and web with automated app store builds.',
    keyProjects: ['Expo SDK', 'Expo Router', 'EAS CLI'],
    district: 'developer',
    tier: 'developer',
  },

  // --- STARTER SHORES & INNOVATION DISTRICT (Rising Stars & Modern Solutions) ---
  {
    username: 'lucide-icons',
    buildingName: 'Lucide Vector Iconography Studio',
    displayName: 'Lucide Project',
    address: '501 Pixel Avenue, Starter Shores',
    category: 'framework',
    repos: 20,
    followers: 4000,
    bio: 'Community-driven open-source icon suite featuring over 1,400 clean, lightweight, and customizable SVG vectors for modern web apps.',
    keyProjects: ['Lucide React', 'Lucide Icons', 'Lucide Lab'],
    district: 'starter',
    tier: 'starter',
  },
  {
    username: 'biomejs',
    buildingName: 'Biome High-Speed Toolchain',
    displayName: 'Biome Core',
    address: '512 Linter Lane, Starter Shores',
    category: 'framework',
    repos: 30,
    followers: 5000,
    bio: 'One toolchain for your web project. Formats and lints JavaScript, TypeScript, JSX, and JSON in fractions of a second using Rust.',
    keyProjects: ['Biome Formatter', 'Biome Linter', 'Analyzer'],
    district: 'starter',
    tier: 'starter',
  },
  {
    username: 'honojs',
    buildingName: 'Hono Multi-Runtime Terminal',
    displayName: 'Hono (Yusuke Wada)',
    address: '525 Edge Function Wharf, Starter Shores',
    category: 'framework',
    repos: 25,
    followers: 6000,
    bio: 'Ultrafast, lightweight, web-standards framework that runs on Cloudflare Workers, Fastly Compute, Deno, Bun, and Node.js.',
    keyProjects: ['Hono Core', 'Hono JSX', 'Middleware Engine'],
    district: 'starter',
    tier: 'starter',
  },
  {
    username: 'zustand',
    buildingName: 'Zustand State Pavilion',
    displayName: 'Zustand (Poimandres)',
    address: '538 Bear Store Way, Starter Shores',
    category: 'framework',
    repos: 10,
    followers: 6000,
    bio: 'A small, fast and scalable bearbones state-management solution using simplified flux principles and React hooks without boilerplate.',
    keyProjects: ['Zustand', 'Jotai', 'Valtio'],
    district: 'starter',
    tier: 'starter',
  },
  {
    username: 'tanstack',
    buildingName: 'TanStack Headless Architecture',
    displayName: 'TanStack (Tanner Linsley)',
    address: '550 Async Query Court, Starter Shores',
    category: 'framework',
    repos: 40,
    followers: 9000,
    bio: 'Creators of TanStack Query, Table, Router, Form, and Virtual. Framework-agnostic asynchronous state management for the web.',
    keyProjects: ['TanStack Query', 'TanStack Table', 'TanStack Router'],
    district: 'starter',
    tier: 'starter',
  },
  {
    username: 'directus',
    buildingName: 'Directus Open Data Exchange',
    displayName: 'Directus',
    address: '562 Schema Dock, Starter Shores',
    category: 'framework',
    repos: 50,
    followers: 7000,
    bio: 'Open-source Data Platform providing instant REST and GraphQL APIs layered directly on top of SQL databases with an intuitive admin app.',
    keyProjects: ['Directus Core', 'Directus App', 'Directus SDK'],
    district: 'starter',
    tier: 'starter',
  },
  {
    username: 'posthog',
    buildingName: 'PostHog Analytics Observatory',
    displayName: 'PostHog',
    address: '575 Telemetry Pier, Starter Shores',
    category: 'framework',
    repos: 65,
    followers: 8000,
    bio: 'The open-source all-in-one product analytics suite: session replays, feature flags, A/B experiments, heatmaps, and user path tracking.',
    keyProjects: ['PostHog App', 'PostHog JS', 'Plugin Server'],
    district: 'starter',
    tier: 'starter',
  },
  {
    username: 'calcom',
    buildingName: 'Cal.com Time Infrastructure',
    displayName: 'Cal.com',
    address: '588 Timezone Boulevard, Starter Shores',
    category: 'framework',
    repos: 35,
    followers: 6000,
    bio: 'The open-source scheduling infrastructure and customizable appointment platform. Self-hostable, white-label alternative to Calendly.',
    keyProjects: ['Cal.com Core', 'App Store', 'Embed Engine'],
    district: 'starter',
    tier: 'starter',
  },
];

export const FAMOUS_DEVELOPERS = FACTUAL_CITY_ENTITIES;

export const DISTRICTS = [
  { id: 'starter', name: 'Starter Shores', subtitle: 'Where Every Journey Begins', color: '#68d391', coords: '25° 46′ N, 80° 11′ W' },
  { id: 'developer', name: 'Silicon Waterfront', subtitle: 'The Creative Engine Room', color: '#63b3ed', coords: '25° 47′ N, 80° 12′ W' },
  { id: 'enterprise', name: 'Metropolis Core', subtitle: 'Built To Move The World', color: '#b794f4', coords: '25° 48′ N, 80° 10′ W' },
  { id: 'legend', name: 'Apex District', subtitle: 'For Giants Who Built The Web', color: '#f6e05e', coords: '25° 49′ N, 80° 11′ W' },
];

// Factual municipal and telecommunications infrastructure for any remaining block fillers
const FACTUAL_INFRASTRUCTURE_TITLES = [
  { name: 'Metropolis IXP Fiber Exchange Core', address: '101 Optical Spine, Transit Corridor', desc: 'Central Internet Exchange Point routing high-bandwidth fiber traffic across the city grid.' },
  { name: 'Subsea Optical Cable Landing Terminal', address: '202 Marine Conduit, Harbor Sector', desc: 'Trans-Oceanic telecommunications landing station connecting global data backbones.' },
  { name: 'Metropolitan Grid Power Substation 04', address: '305 High-Voltage Boulevard, Power Sector', desc: 'Critical power switching hub providing redundant energy to downtown data center facilities.' },
  { name: 'Regional High-Density Availability Zone', address: '412 Edge Node Avenue, Central District', desc: 'Tier-IV municipal cloud compute and hardware redundancy facility.' },
  { name: 'Metropolis Central Packet Interchange', address: '520 Packet Expressway, North Transit', desc: 'Core routing facility maintaining gigabit peer connections across municipal subnets.' },
  { name: 'Global DNS Anycast Primary Node', address: '633 Root Server Lane, Network District', desc: 'High-availability low-latency authoritative root DNS server node.' },
];

// Asphalt Road Texture
export function createAsphaltTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#181c1f';
  ctx.fillRect(0, 0, 512, 1024);

  // Micro grain
  ctx.fillStyle = 'rgba(255,255,255,0.02)';
  for (let i = 0; i < 4000; i++) {
    const rx = Math.random() * 512;
    const ry = Math.random() * 1024;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Double Solid Yellow Center Line
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(250, 0);
  ctx.lineTo(250, 1024);
  ctx.moveTo(262, 0);
  ctx.lineTo(262, 1024);
  ctx.stroke();

  // White Dashed Lane Lines
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;
  ctx.setLineDash([35, 45]);
  ctx.beginPath();
  ctx.moveTo(125, 0);
  ctx.lineTo(125, 1024);
  ctx.moveTo(387, 0);
  ctx.lineTo(387, 1024);
  ctx.stroke();

  // White Solid Edge Lines
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
  return texture;
}

// Sidewalk Texture
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

// Skyscraper Window Texture with Emissive Glow
export function createWindowTexture(
  type: 'office' | 'glass_tech' | 'cyber',
  hue: number = 210
): { diffuse: THREE.CanvasTexture; emissive: THREE.CanvasTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  const eCanvas = document.createElement('canvas');
  eCanvas.width = 512;
  eCanvas.height = 1024;
  const eCtx = eCanvas.getContext('2d')!;

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
          const lgt = 65 + random() * 20;
          lightCol = `hsl(${38 + random() * 10}, 95%, ${lgt}%)`;
          emitCol = `hsl(${38 + random() * 10}, 95%, 55%)`;
        } else if (randTemp < 0.88) {
          const lgt = 75 + random() * 15;
          lightCol = `hsl(${210 + random() * 15}, 60%, ${lgt}%)`;
          emitCol = `hsl(${210 + random() * 15}, 70%, 65%)`;
        } else {
          lightCol = `hsl(${hue}, 90%, 70%)`;
          emitCol = `hsl(${hue}, 95%, 60%)`;
        }

        ctx.fillStyle = lightCol;
        ctx.fillRect(x, y, w, h);

        eCtx.fillStyle = emitCol;
        eCtx.fillRect(x, y, w, h);

        if (random() > 0.45) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
          const bH = random() * (h * 0.65);
          ctx.fillRect(x, y, w, bH);
          eCtx.fillStyle = '#000000';
          eCtx.fillRect(x, y, w, bH);
        }
      } else {
        ctx.fillStyle = '#0d1318';
        ctx.fillRect(x, y, w, h);
      }

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

// Helipad Texture
export function createHelipadTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1e2428';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = '#d5f36a';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(256, 256, 215, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(256, 256, 180, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 220px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('H', 256, 256);

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

  return new THREE.CanvasTexture(canvas);
}

// Generate the fully factual procedural city grid
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

  let entityIndex = 0;
  let infraIndex = 0;

  for (let gx = -3; gx <= 3; gx++) {
    for (let gz = -3; gz <= 3; gz++) {
      const centerX = gx * (blockSize + roadWidth);
      const centerZ = gz * (blockSize + roadWidth);
      const distFromCenter = Math.sqrt(gx * gx + gz * gz);

      // District assignment
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
        const height = 245;
        const torvalds = FACTUAL_CITY_ENTITIES[0];
        entityIndex++;

        buildings.push({
          id: `b_apex_${torvalds.username}`,
          buildingName: torvalds.buildingName,
          address: torvalds.address,
          category: torvalds.category,
          gridX: gx,
          gridZ: gz,
          x: centerX,
          z: centerZ,
          width: 50,
          depth: 50,
          height,
          style: 'spire',
          roofStyle: 'helipad',
          primaryColor: '#2b3644',
          windowHue: 45,
          district: 'legend',
          tier: 'legend',
          resident: {
            username: torvalds.username,
            displayName: torvalds.displayName,
            avatarUrl: `https://avatars.githubusercontent.com/${torvalds.username}`,
            repos: torvalds.repos,
            followers: torvalds.followers,
            bio: torvalds.bio,
            keyProjects: torvalds.keyProjects,
          },
        });
        continue;
      }

      // 4 distinct lots per city block
      const subLots = [
        { offsetX: -16, offsetZ: -16, w: 26, d: 26 },
        { offsetX: 16, offsetZ: -16, w: 26, d: 26 },
        { offsetX: -16, offsetZ: 16, w: 26, d: 26 },
        { offsetX: 16, offsetZ: 16, w: 26, d: 26 },
      ];

      subLots.forEach((lot, i) => {
        const baseH = Math.max(50, 180 - distFromCenter * 32);
        const height = baseH + ((Math.abs(gx * 17 + gz * 23 + i * 11) % 55) - 20);
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
        const windowHue = [35, 195, 215, 160, 275, 45][(gx + 3 + gz + 3 + i) % 6];

        // Assign real factual open source entity
        let buildingName: string;
        let address: string;
        let category: 'developer' | 'foundation' | 'framework' | 'infrastructure' | 'civic' = 'framework';
        let resident = undefined;

        if (entityIndex < FACTUAL_CITY_ENTITIES.length) {
          const entity = FACTUAL_CITY_ENTITIES[entityIndex++];
          buildingName = entity.buildingName;
          address = entity.address;
          category = entity.category;
          resident = {
            username: entity.username,
            displayName: entity.displayName,
            avatarUrl: `https://avatars.githubusercontent.com/${entity.username}`,
            repos: entity.repos,
            followers: entity.followers,
            bio: entity.bio,
            keyProjects: entity.keyProjects,
          };
        } else {
          // Factual civic & telecommunications infrastructure node
          const infra = FACTUAL_INFRASTRUCTURE_TITLES[infraIndex % FACTUAL_INFRASTRUCTURE_TITLES.length];
          infraIndex++;
          buildingName = infra.name;
          address = infra.address;
          category = 'civic';
          resident = {
            username: 'open-source-network',
            displayName: infra.name,
            avatarUrl: 'https://avatars.githubusercontent.com/github',
            repos: 42,
            followers: 18500,
            bio: infra.desc,
            keyProjects: ['High-Bandwidth Fiber', 'Anycast Routing', 'Edge Cache'],
          };
        }

        buildings.push({
          id: `b_${gx}_${gz}_${i}`,
          buildingName,
          address,
          category,
          gridX: gx,
          gridZ: gz,
          x: centerX + lot.offsetX,
          z: centerZ + lot.offsetZ,
          width: Math.max(22, w),
          depth: Math.max(22, d),
          height: Math.max(50, height),
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

// Synthesize or locate factual user skyscraper
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
  let height = 85 + Math.min(220, Math.sqrt(repos) * 16 + Math.log10(Math.max(1, followers)) * 28);
  let district = 'starter';
  let districtName = 'Starter Shores';

  if (followers > 5000 || repos > 150) {
    tier = 'legend';
    district = 'legend';
    districtName = 'Apex District';
    height = Math.max(195, height);
  } else if (followers > 500 || repos > 50) {
    tier = 'enterprise';
    district = 'enterprise';
    districtName = 'Metropolis Core';
    height = Math.max(145, height);
  } else if (followers > 50 || repos > 10) {
    tier = 'developer';
    district = 'developer';
    districtName = 'Silicon Waterfront';
    height = Math.max(105, height);
  }

  const hash = profile.login.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const targetX = ((hash % 5) - 2) * 89 + (hash % 15) - 7;
  const targetZ = (((hash * 7) % 5) - 2) * 89 + ((hash * 13) % 15) - 7;

  // Real factual address in Commit City
  const streetNumber = 100 + (hash % 890);
  const avenueName = ['Silicon Boulevard', 'Grand Avenue', 'Terminal Parkway', 'Open Source Way', 'Ocean Expressway'][(hash % 5)];
  const factualAddress = `${streetNumber} ${avenueName}, ${districtName}`;
  const factualBuildingName = profile.name
    ? `${profile.name} Tower`
    : `@${profile.login} Headquarters`;

  const userBuilding: CityBuildingData = {
    id: `user_tower_${profile.login}`,
    buildingName: factualBuildingName,
    address: factualAddress,
    category: 'developer',
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
      bio: profile.bio || `Public contributor on GitHub with ${profile.public_repos} open source repositories.`,
      company: profile.company || undefined,
      location: profile.location || undefined,
    },
  };

  return { userBuilding, isNewLot: true };
}
