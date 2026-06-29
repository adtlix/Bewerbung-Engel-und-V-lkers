"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Die komplette 3D-Szene wird ausschließlich clientseitig geladen (ssr: false).
 * Grund: Three.js, WebGL und GSAP ScrollTrigger benötigen `window`/`document`,
 * die beim Server-Rendering nicht existieren.
 */
const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-black">
      <span className="animate-pulse font-mono text-xs tracking-[0.5em] text-white/40">
        LADE 3D-ERLEBNIS…
      </span>
    </div>
  ),
});

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  // Scroll-Hinweis ausblenden, sobald der User zu scrollen beginnt
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative w-full bg-black">
      {/* === FIXIERTER 3D-CANVAS (bleibt stehen, während die Seite scrollt) === */}
      <div className="fixed inset-0 z-0 h-screen w-screen">
        <Scene />
      </div>

      {/* === FESTE HUD-OVERLAYS (über dem Canvas) === */}
      <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between p-6 md:p-10">
        {/* Kopfzeile: Wortmarke + Status */}
        <header className="flex items-start justify-between">
          <div className="flex flex-col leading-none">
            <span className="font-mono text-[10px] tracking-[0.6em] text-white/50">
              ENGEL &amp; VÖLKERS
            </span>
            <span className="mt-1 font-mono text-[10px] tracking-[0.4em] text-ev-red">
              BEWERBUNG · LEHRSTART 2027
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-livePulse rounded-full bg-ev-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-white/50">
              LIVE
            </span>
          </div>
        </header>

        {/* Fußzeile: Scroll-Aufforderung */}
        <footer className="flex items-end justify-between">
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/40">
            J. E. CHRISTEN · CHUR
          </span>
          <div
            className={`flex flex-col items-center gap-2 transition-opacity duration-700 ${
              scrolled ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-white/60">
              SCROLLEN
            </span>
            <span className="relative flex h-8 w-5 items-start justify-center rounded-full border border-white/30">
              <span className="mt-1.5 h-1.5 w-1 animate-bounce rounded-full bg-white/70" />
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/40">
            WEBGL · R3F
          </span>
        </footer>
      </div>

      {/* === SCROLL-CONTAINER: 500vh treiben die Kamerafahrt an === */}
      {/* Dieser unsichtbare, hohe Block erzeugt den nativen Fenster-Scroll, */}
      {/* an den GSAP ScrollTrigger die Kamera bindet. */}
      <div id="scroll-root" className="relative z-[1] h-[500vh] w-full" aria-hidden />
    </main>
  );
}
