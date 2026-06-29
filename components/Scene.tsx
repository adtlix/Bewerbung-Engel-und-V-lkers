"use client";

import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useState } from "react";

import Environment from "./Environment";
import CameraScroll from "./CameraScroll";
import ScreenUI from "./ScreenUI";
import {
  CAM_START_Z,
  CAM_EYE_Y,
  TV_CENTER_Y,
  TV_Z,
} from "./sceneConfig";

/**
 * Scene.tsx — Das R3F-Herzstück.
 *  - <Canvas> mit aktiven Schatten für Chiaroscuro
 *  - Dramatisches Lichtdesign (KEIN flaches AmbientLight)
 *  - Post-Processing-Pipeline: Bloom · DepthOfField · Noise · Vignette
 *  - Hält den `revealed`-State, der das TV-Overlay einblendet, sobald die
 *    Kamera vor dem Fernseher zum Stehen kommt.
 */
export default function Scene() {
  const [revealed, setRevealed] = useState(false);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
      }}
      camera={{
        position: [0, CAM_EYE_Y, CAM_START_Z],
        fov: 42,
        near: 0.1,
        far: 200,
      }}
    >
      {/* Tiefes Schwarz als Hintergrund + Nebel für Tiefe und Mystery */}
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 14, 60]} />

      <Suspense fallback={null}>
        {/* ===================== LICHTDESIGN (Chiaroscuro) ===================== */}
        {/* Bewusst KEIN ambientLight — Dramatik durch harte Hell-Dunkel-Kontraste. */}

        {/* Schwaches, kühles Hemisphären-Licht nur als minimaler Fülleffekt */}
        <hemisphereLight args={["#1a1d24", "#000000", 0.12]} />

        {/* Hauptlicht: gerichtet, harte Schatten — modelliert den Flur */}
        <directionalLight
          position={[6, 9, 6]}
          intensity={1.1}
          color="#cdd6e0"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={1}
          shadow-camera-far={80}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-bias={-0.0005}
        />

        {/* Weicher Spot von oben, der den Weg zum TV inszeniert */}
        <spotLight
          position={[0, TV_CENTER_Y + 8, TV_Z + 16]}
          target-position={[0, 0, TV_Z]}
          angle={0.5}
          penumbra={0.9}
          intensity={45}
          distance={60}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0006}
        />

        {/* Volumetrischer roter Akzent (E&V-Rot) hinter / um den TV */}
        <pointLight
          position={[0, TV_CENTER_Y, TV_Z - 1]}
          intensity={28}
          distance={22}
          decay={2}
          color="#E4002B"
        />
        {/* Roter Streifschimmer entlang der Wände im hinteren Flurdrittel */}
        <pointLight
          position={[-3.2, 1, TV_Z + 14]}
          intensity={9}
          distance={16}
          decay={2}
          color="#E4002B"
        />
        <pointLight
          position={[3.2, 1, TV_Z + 14]}
          intensity={9}
          distance={16}
          decay={2}
          color="#E4002B"
        />

        {/* Kühles Schlüssellicht am Eingang, damit der Start nicht stockdunkel ist */}
        <pointLight
          position={[0, TV_CENTER_Y + 1, CAM_START_Z - 1]}
          intensity={10}
          distance={18}
          decay={2}
          color="#9fb4c7"
        />

        {/* ===================== GEOMETRIE & OVERLAY ===================== */}
        <Environment />
        <ScreenUI revealed={revealed} />

        {/* ===================== KAMERA-LOGIK ===================== */}
        <CameraScroll onReveal={setRevealed} />

        {/* ===================== POST-PROCESSING ===================== */}
        <EffectComposer multisampling={4}>
          {/* Bloom — lässt den TV-Screen leuchten */}
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={1.5}
            mipmapBlur
            radius={0.7}
          />
          {/* Depth of Field — Fokus exakt auf den TV, Vordergrund unscharf */}
          <DepthOfField
            focusDistance={0.0}
            focalLength={0.05}
            bokehScale={4.5}
            height={480}
          />
          {/* Film Grain — subtiles Rauschen für den Cinematic Look */}
          <Noise opacity={0.03} premultiply blendFunction={BlendFunction.SCREEN} />
          {/* Vignette — abgedunkelte Ränder */}
          <Vignette eskil={false} offset={0.25} darkness={0.95} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
