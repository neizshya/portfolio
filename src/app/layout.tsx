import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mochamad Nurul Adzan - Portfolio",
  description: "A 3D Journey Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
