import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mochamad Nurul Adzan - Frontend Developer Portfolio",
    short_name: "M. Nurul Adzan",
    description:
      "Interactive 3D portfolio showcasing frontend development projects by Mochamad Nurul Adzan",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a2e",
    theme_color: "#1a1a2e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
