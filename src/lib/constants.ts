// Scene Configuration
export const SCENE_CONFIG = {
  ROAD_LENGTH: 220,
  TRAVEL: 170, // ROAD_LENGTH - 50
  BUFFER_LENGTH: 20,
} as const;

// Viewport Breakpoints
export const VIEWPORT = {
  MOBILE_WIDTH: 5,
  MOBILE_SCREEN: 768,
} as const;

// Camera Settings
export const CAMERA = {
  MOBILE: {
    Z: 6,
    Y: 2.2,
    LOOK_Z: -12,
    FOV: 65,
  },
  DESKTOP: {
    Z: 8,
    Y: 2.5,
    LOOK_Z: -15,
    FOV: 50,
  },
  LOOK_Y: 1.5,
} as const;

// Road Configuration
export const ROAD = {
  MOBILE_WIDTH: 3.5,
  DESKTOP_WIDTH: 6,
  LANE_WIDTH: 0.4,
  DASH_SPACING: 6,
  DASH_LENGTH: 1.2,
  CURB: {
    MOBILE_WIDTH: 0.6,
    DESKTOP_WIDTH: 1,
    HEIGHT: 0.2,
  },
} as const;

// Sign/Milestone Configuration
export const SIGN = {
  MOBILE: {
    WIDTH: 4.5,
    HEIGHT: 2.3,
    POST_HEIGHT: 3.5,
    X_OFFSET: 2.3,
  },
  DESKTOP: {
    WIDTH: 9.0,
    HEIGHT: 3.0,
    POST_HEIGHT: 6.0,
    X_OFFSET: 8.0,
  },
  POST_RADIUS: {
    MOBILE: 0.15,
    DESKTOP: 0.25,
  },
} as const;

// Billboard Configuration
export const BILLBOARD = {
  WIDTH: 10,
  HEIGHT: 4,
  POLE_HEIGHT: 7,
  SIGN_HEIGHT_POS: 5,
  POLE_RADIUS: 0.2,
} as const;

// Colors
export const COLORS = {
  SIGN_BACKGROUND: "#0b5fff",
  SIGN_FRAME: "#0a0a0a",
  SIGN_TITLE: "#fff",
  SIGN_COMPANY: "#ffdd00",
  SIGN_DESCRIPTION: "#e6efe6",
  SIGN_DATE: "#d0d0d0",
  POST: "#222",
  POST_BASE: "#444",
  ROAD_SURFACE: "#0a0a0a",
  ROAD_DASH: "#606060",
  CURB: "#c36d37",
  BILLBOARD_RED: "#aa0000",
  TREE_TRUNK: "#2b2b2b",
  TREE_DARK: "#1a3c30",
  TREE_LIGHT: "#255240",
  MOUNTAIN: "#0f1520",
  GROUND: "#050505",
  BACKGROUND: "gray-900",
} as const;

// Material Properties
export const MATERIALS = {
  SIGN: {
    roughness: 0.25,
    metalness: 0.06,
  },
  FRAME: {
    roughness: 0.6,
    metalness: 0.8,
  },
  POST: {
    roughness: 0.6,
    metalness: 0.9,
  },
  ROAD: {
    roughness: 0.95,
    metalness: 0.02,
  },
  CURB: {
    roughness: 0.7,
    metalness: 0.1,
  },
} as const;

// Light Configuration
export const LIGHTING = {
  AMBIENT_INTENSITY: 0.2,
  HEMISPHERE: {
    sky: 0xcfe8ff,
    ground: 0x000000,
    intensity: 0.6,
  },
  DIRECTIONAL: {
    position: [6, 10, 6] as [number, number, number],
    intensity: 1.2,
    shadow: {
      MOBILE: 512,
      DESKTOP: 1024,
    },
  },
  SPOTLIGHT: {
    position: [-6, 4, 6] as [number, number, number],
    intensity: 0.5,
    angle: 0.6,
    penumbra: 0.3,
  },
} as const;

// Stars Configuration
export const STARS = {
  MOBILE_COUNT: 2000,
  DESKTOP_COUNT: 3000,
  RADIUS: 100,
  DEPTH: 50,
  FACTOR: 4,
} as const;

// Landscape Configuration
export const LANDSCAPE = {
  TREE_COUNT: 80,
  MOUNTAIN_COUNT: 40,
  TREE: {
    MIN_DISTANCE: 5,
    MAX_DISTANCE: 15,
    MIN_SCALE: 0.5,
    MAX_SCALE: 1.0,
  },
  MOUNTAIN: {
    MIN_DISTANCE: 20,
    MAX_DISTANCE: 60,
    MIN_SCALE: 5,
    MAX_SCALE: 20,
  },
  GROUND_SIZE: 500,
} as const;

// Animation Configuration
export const ANIMATION = {
  BIKE_WOBBLE_SPEED: 2,
  BIKE_WOBBLE_AMOUNT: 0.03,
  SCROLL_LERP_FACTOR: 0.05,
} as const;

// Scroll Configuration
export const SCROLL = {
  JOURNEY_HEIGHT_MULTIPLIER: 5,
  HEADER_HIDE_THRESHOLD: 0.7,
  PROJECTS_SHOW_THRESHOLD: 0.95,
  TRANSITION_DURATION: "duration-500",
} as const;

// Font URL
export const FONTS = {
  INTER_BOLD:
    "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff",
} as const;

// Performance Configuration
export const PERFORMANCE = {
  MOBILE_DPR: [0.8, 1] as [number, number],
  DESKTOP_DPR: [1, 2] as [number, number],
  MIN_PERFORMANCE: 0.5,
} as const;
