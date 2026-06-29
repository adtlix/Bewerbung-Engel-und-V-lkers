import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BREAKING NEWS — Julian Eric Christen × Engel & Völkers",
  description:
    "Cinematic 3D Scrollytelling — Bewerbung von Julian Eric Christen bei Engel & Völkers (Lehrstart 2027). Ein Full-Stack-Entwickler, der digitale 3D-Immobilien-Erlebnisse baut.",
  authors: [{ name: "Julian Eric Christen" }],
  keywords: [
    "Engel & Völkers",
    "Bewerbung",
    "Lehrstart 2027",
    "Julian Eric Christen",
    "3D Scrollytelling",
    "WebGL",
    "Immobilien",
  ],
  openGraph: {
    title: "BREAKING NEWS — Julian Eric Christen × Engel & Völkers",
    description:
      "Cinematic 3D Scrollytelling-Bewerbung. Entwickler trifft auf Immobilien-Expertise.",
    type: "website",
    locale: "de_CH",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="bg-black">
      <body className="bg-black text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
