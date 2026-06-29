# BREAKING NEWS — Julian Eric Christen × Engel & Völkers

Eine **Cinematic 3D Scrollytelling**-Web-App als High-End-Bewerbung von
Julian Eric Christen bei Engel & Völkers (Lehrstart 2027).

Der User scrollt, die Kamera gleitet weich durch einen dunklen, minimalistischen
3D-Flur (Dark Brutalism, Chiaroscuro-Licht) bis vor einen leuchtenden,
randlosen Flachbildfernseher. Dort fadet ein Breaking-News-Overlay im
Bloomberg/CNN-Stil mit den persönlichen Eckdaten ein.

## Tech-Stack

- **Next.js 14** (App Router) · React 18 · TypeScript
- **React Three Fiber** + **@react-three/drei** (3D / WebGL)
- **@react-three/postprocessing** — Bloom · Depth of Field · Noise · Vignette
- **GSAP** + **ScrollTrigger** (`@gsap/react`) — scroll-gebundene Kamerafahrt
- **Tailwind CSS** — UI / News-Overlay

## Schnellstart

```bash
npm install
npm run dev
```

Dann <http://localhost:3000> öffnen und **scrollen**.

```bash
npm run build   # produktiver Build
npm run start   # Produktionsserver
```

## Projektstruktur

| Datei | Aufgabe |
| --- | --- |
| `app/layout.tsx` | Root-Layout, Metadata, Tailwind-Import |
| `app/page.tsx` | Scroll-Container (`h-[500vh]`) + fixierter Canvas + HUD |
| `app/globals.css` | Tailwind-Direktiven, schwarzer Hintergrund |
| `components/Scene.tsx` | R3F-Canvas, Chiaroscuro-Licht, Post-Processing-Pipeline |
| `components/Environment.tsx` | Flur (Box-Geometrien, useMemo), spiegelnder Boden, TV |
| `components/CameraScroll.tsx` | GSAP-ScrollTrigger-Kamerafahrt (scrub) + Cleanup |
| `components/ScreenUI.tsx` | `<Html>`-Overlay: Breaking-News-UI mit den Bewerbungsdaten |
| `components/sceneConfig.ts` | Geteilte Geometrie- & Kamera-Konstanten |

## Art Direction

- **Farben:** Tiefes Schwarz `#000000`, Anthrazit `#111111`, Weiß `#FFFFFF`,
  volumetrisches **Engel-&-Völkers-Rot `#E4002B`**.
- **Licht:** Kein flaches AmbientLight — DirectionalLight (harte Schatten),
  SpotLight (weiche Penumbra), rote PointLights als volumetrischer Akzent.
- **Post-Processing:** Bloom (TV-Glow), Depth of Field (Fokus auf den Screen),
  Film Grain & Vignette für den Kino-Look.
