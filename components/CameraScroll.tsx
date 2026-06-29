"use client";

import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import {
  CAM_START_Z,
  CAM_END_Z,
  CAM_EYE_Y,
  TV_CENTER_Y,
  TV_Z,
} from "./sceneConfig";

// GSAP-Plugin global registrieren (idempotent)
gsap.registerPlugin(ScrollTrigger, useGSAP);

type CameraScrollProps = {
  /** Wird true, sobald die Kamera (fast) vor dem TV steht → blendet das Overlay ein. */
  onReveal: (revealed: boolean) => void;
};

/**
 * CameraScroll.tsx — Bindet die Three.js-Kamera an den nativen Fenster-Scroll.
 *  - GSAP ScrollTrigger mit scrub: true → 1:1-Kopplung an die Scrollbar
 *  - Kamera gleitet auf der Z-Achse durch den Flur bis exakt vor den TV
 *  - Schwellenwert-Trigger blendet das Breaking-News-Overlay ein
 *  - Sauberes Cleanup: ScrollTrigger.kill() im Teardown
 */
export default function CameraScroll({ onReveal }: CameraScrollProps) {
  const camera = useThree((state) => state.camera);
  const lookTarget = useRef(new THREE.Vector3(0, TV_CENTER_Y, TV_Z));
  // Verhindert unnötige Re-Renders: nur bei echtem Zustandswechsel callbacken
  const revealedRef = useRef(false);

  // Startzustand der Kamera setzen
  useEffect(() => {
    camera.position.set(0, CAM_EYE_Y, CAM_START_Z);
    camera.lookAt(lookTarget.current);
    camera.updateProjectionMatrix();
  }, [camera]);

  useGSAP(
    () => {
      const proxy = { z: CAM_START_Z };

      const tween = gsap.to(proxy, {
        z: CAM_END_Z,
        ease: "none",
        scrollTrigger: {
          trigger: "#scroll-root",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Kamera entlang Z bewegen, dauerhaft auf den TV fokussiert
            camera.position.set(0, CAM_EYE_Y, proxy.z);
            camera.lookAt(lookTarget.current);

            // Overlay einblenden, sobald wir nahezu vor dem TV stehen
            const shouldReveal = self.progress > 0.92;
            if (shouldReveal !== revealedRef.current) {
              revealedRef.current = shouldReveal;
              onReveal(shouldReveal);
            }
          },
        },
      });

      // Layout nach Mount neu berechnen (Canvas + DOM sind jetzt sicher da)
      ScrollTrigger.refresh();

      // Cleanup: Tween + ALLE ScrollTrigger-Instanzen zerstören
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { dependencies: [camera] }
  );

  return null;
}
