import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Mochamad Nurul Adzan (M. Nurul Adzan) - Frontend Developer Portfolio",
    template: "%s | Mochamad Nurul Adzan",
  },
  description:
    "Mochamad Nurul Adzan (M. Nurul Adzan, Nurul Adzan) - Frontend Developer and Touring Enthusiast. Interactive 3D portfolio showcasing React, Next.js, TypeScript, and Three.js projects. View my web development work including e-commerce platforms, helpdesk systems, and modern web applications.",
  keywords: [
    "Mochamad Nurul Adzan",
    "M. Nurul Adzan",
    "Nurul Adzan",
    "Neizshya",
    "Frontend Developer",
    "Web Developer Indonesia",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Three.js Developer",
    "3D Web Developer",
    "Portfolio",
    "Web Development",
    "UI/UX Developer",
    "Touring Enthusiast",
  ],
  authors: [
    { name: "Mochamad Nurul Adzan", url: "https://github.com/neizshya" },
  ],
  creator: "Mochamad Nurul Adzan",
  publisher: "Mochamad Nurul Adzan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://m-nurul-a.tech/",
    siteName: "Mochamad Nurul Adzan Portfolio",
    title: "Mochamad Nurul Adzan - Frontend Developer & Touring Enthusiast",
    description:
      "Interactive 3D portfolio showcasing frontend development projects by Mochamad Nurul Adzan. Specializing in React, Next.js, TypeScript, and Three.js.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mochamad Nurul Adzan Portfolio",
      },
    ],
  },

  alternates: {
    canonical: "https://m-nurul-a.tech/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mochamad Nurul Adzan",
    alternateName: ["M. Nurul Adzan", "Nurul Adzan", "Neizshya"],
    url: "https://neizshya-portfolio.vercel.app",
    image: "https://neizshya-portfolio.vercel.app/og-image.png",
    jobTitle: "Frontend Developer",
    description:
      "Frontend Developer and Touring Enthusiast specializing in React, Next.js, TypeScript, and Three.js",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Three.js",
      "JavaScript",
      "Frontend Development",
      "Web Development",
      "UI/UX",
      "3D Web Graphics",
    ],
    sameAs: ["https://github.com/neizshya"],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://neizshya-portfolio.vercel.app" />
      </head>
      <body>{children}</body>
    </html>
  );
}
