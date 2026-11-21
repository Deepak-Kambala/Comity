export interface GitHubProfile {
  login: string;
  id?: number;
  avatar_url: string;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  bio?: string;
  public_repos: number;
  public_gists?: number;
  followers: number;
  following?: number;
  created_at?: string;
  html_url?: string;
}

export interface CityBuildingData {
  id: string;
  gridX: number;
  gridZ: number;
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  style: 'glass_tower' | 'stepped_artdeco' | 'monolith' | 'cyber_complex' | 'spire';
  roofStyle: 'helipad' | 'antenna' | 'chillers' | 'spire_crown' | 'penthouse';
  primaryColor: string;
  windowHue: number;
  district: string;
  tier: 'starter' | 'developer' | 'enterprise' | 'legend';
  resident?: {
    username: string;
    displayName: string;
    avatarUrl: string;
    repos: number;
    followers: number;
    bio?: string;
  };
}

export type TimeOfDay = 'vice_sunset' | 'neon_night' | 'storm_rain' | 'miami_noon';
export type CameraMode = 'cinematic_orbit' | 'street_view' | 'birds_eye' | 'free_orbit';
