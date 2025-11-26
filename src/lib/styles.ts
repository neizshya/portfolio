/**
 * Shared CSS class utilities for consistent styling
 */

export const LAYOUT = {
  container: "max-w-7xl mx-auto",
  section: "min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8",
} as const;

export const TEXT = {
  heading: "text-3xl sm:text-4xl md:text-5xl font-bold text-white",
  subheading: "text-base sm:text-lg md:text-xl text-gray-400",
  cardTitle: "text-xl sm:text-2xl font-bold text-white",
  cardText: "text-sm sm:text-base text-gray-400",
  buttonText: "text-center text-sm sm:text-base",
} as const;

export const SPACING = {
  sectionTitle: "mb-8 sm:mb-12 md:mb-16",
  cardPadding: "p-4 sm:p-6",
  cardImage: "h-40 sm:h-48",
  textGap: "mb-3 sm:mb-4",
  buttonGap: "gap-3 sm:gap-4",
} as const;

export const EFFECTS = {
  transition: "transition-all duration-300",
  hoverLift: "hover:-translate-y-2",
  hoverScale: "group-hover:scale-110 transition-transform duration-300",
  shadow: "shadow-lg hover:shadow-2xl",
} as const;

export const COLORS_CSS = {
  card: "bg-gray-800",
  cardImage: "bg-gray-700",
  button: "bg-gray-700 hover:bg-gray-600",
  buttonPrimary: "bg-green-600 hover:bg-green-500",
  badge: "bg-gray-700 text-green-400",
  gradient: "bg-linear-to-b from-gray-900 to-black",
} as const;
