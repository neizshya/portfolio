import { Group } from "three";
import { RefObject } from "react";

// Database Types
export interface ResumeItem {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string;
  distance: number;
  type?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech_stack: string;
  github_link: string;
  live_link: string;
  order: number;
}

// Component Props
export interface ScrollProgressProps {
  scrollProgress: number;
}

export interface SignDimensions {
  width: number;
  height: number;
  postHeight: number;
  xOffset: number;
  postRadius: number;
  scale: number;
}

export interface LandscapeObject {
  pos: [number, number, number];
  scale: number;
  rot?: number;
}

export interface SceneryData {
  trees: LandscapeObject[];
  mountains: Required<LandscapeObject>[];
}

// Refs
export type GroupRef = RefObject<Group>;

// Viewport
export interface ViewportInfo {
  isMobile: boolean;
  width: number;
  height: number;
}
