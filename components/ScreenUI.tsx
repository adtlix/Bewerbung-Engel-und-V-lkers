"use client";

import { Html } from "@react-three/drei";

import { TV_Z, TV_CENTER_Y } from "./sceneConfig";

type ScreenUIProps = {
  /** Steuert das Einblenden des Overlays, sobald die Kamera vor dem TV steht. */
  revealed: boolean;
};

/** Die drei Info-Panels (Variante B). */
const PANELS = [
  {
    tag: "PROFIL",
    title: "4 Sprachen",
    body: "Deutsch · Italienisch · Englisch · Französisch",
  },
  {
    tag: "LEADERSHIP",
    title: "Verantwortung & Disziplin",
    body: "Zertifizierter 14–18-Jugendleiter · Cello-Preisträger (Lyonspreis) · Fussballer (Orion Chur)",
  },
  {
    tag: "USP FÜR E&V",
    title: "Full-Stack-Entwickler",
    body: "Digitalisiert den Verkaufsprozess & baut immersive 3D-Immobilien-Erlebnisse.",
  },
];

const TICKER =
  "+++ 16 JAHRE ALT (CHUR) +++ ENTWICKLER TRIFFT AUF IMMOBILIEN-EXPERTISE +++ 7 ABSOLVIERTE SCHNUPPERTAGE +++ ";

/**
 * ScreenUI.tsx — Das <Html>-Overlay (drei), das exakt auf dem TV-Screen sitzt.
 * Stil: professionelle Nachrichten-Sendung (Bloomberg/CNN), Dark Brutalism,
 * E&V-Rot als Signalfarbe. Wird per CSS-Opacity weich eingeblendet.
 */
export default function ScreenUI({ revealed }: ScreenUIProps) {
  return (
    <Html
      position={[0, TV_CENTER_Y, TV_Z + 0.12]}
      transform
      scale={0.00475}
      distanceFactor={undefined}
      zIndexRange={[5, 0]}
      pointerEvents="none"
      wrapperClass="tv-overlay-root"
    >
      <div
        style={{ width: 820, height: 470 }}
        className={`flex select-none flex-col overflow-hidden border border-white/10 bg-black font-sans text-white shadow-[0_0_60px_rgba(228,0,43,0.25)] transition-all duration-1000 ease-out ${
          revealed ? "opacity-100 blur-0" : "opacity-0 blur-md"
        }`}
      >
        {/* ===================== KOPFLEISTE ===================== */}
        <div className="flex items-stretch border-b border-white/10">
          <div className="flex items-center gap-3 bg-ev-red px-5 py-3">
            <span className="h-2.5 w-2.5 animate-livePulse rounded-full bg-white" />
            <span className="text-[15px] font-extrabold tracking-[0.18em]">
              BREAKING NEWS
            </span>
          </div>
          <div className="flex flex-1 items-center justify-between px-5">
            <span className="font-mono text-[11px] tracking-[0.35em] text-white/55">
              E&amp;V NEWS NETWORK
            </span>
            <span className="font-mono text-[11px] tracking-[0.35em] text-white/80">
              CHUR · 2027
            </span>
          </div>
        </div>

        {/* ===================== HEADLINE ===================== */}
        <div className="border-b border-white/10 px-6 py-5">
          <h1 className="text-[26px] font-black leading-[1.12] tracking-tight">
            JULIAN ERIC CHRISTEN BEWIRBT SICH BEI{" "}
            <span className="text-ev-red">ENGEL &amp; VÖLKERS</span>
          </h1>
          <p className="mt-2 font-mono text-[12px] tracking-[0.3em] text-white/50">
            LEHRSTART 2027 · LIVE-BERICHTERSTATTUNG
          </p>
        </div>

        {/* ===================== INFO-PANELS (GRID) ===================== */}
        <div className="grid flex-1 grid-cols-3 gap-px bg-white/10">
          {PANELS.map((p) => (
            <div
              key={p.title}
              className="flex flex-col justify-between bg-[#0a0a0b] p-5"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-ev-red">
                {p.tag}
              </span>
              <div>
                <h2 className="mt-3 text-[17px] font-bold leading-tight">
                  {p.title}
                </h2>
                <p className="mt-2 text-[12.5px] leading-snug text-white/65">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ===================== LIVE-TICKER ===================== */}
        <div className="flex items-stretch border-t border-white/10 bg-black">
          <div className="flex items-center bg-white px-4 py-2.5">
            <span className="text-[12px] font-black tracking-[0.2em] text-black">
              LIVE
            </span>
          </div>
          <div className="relative flex flex-1 items-center overflow-hidden">
            <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
              <span className="px-4 font-mono text-[13px] tracking-[0.2em] text-white/85">
                {TICKER}
              </span>
              <span
                className="px-4 font-mono text-[13px] tracking-[0.2em] text-white/85"
                aria-hidden
              >
                {TICKER}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
}
