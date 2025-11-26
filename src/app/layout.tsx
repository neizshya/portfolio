import type { Metadata } from "next";
import "./globals.css";
import PowerSyncProvider from "@/components/PowerSyncProvider";

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
      <body>
        <PowerSyncProvider>{children}</PowerSyncProvider>
      </body>
    </html>
  );
}
