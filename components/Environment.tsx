"use client";

import { useMemo } from "react";
import * as THREE from "three";

import {
  HALLWAY_WIDTH,
  HALLWAY_HEIGHT,
  SEGMENT_LENGTH,
  SEGMENT_COUNT,
  CAM_START_Z,
  TV_Z,
  TV_WIDTH,
  TV_HEIGHT,
  TV_CENTER_Y,
} from "./sceneConfig";

/**
 * Environment.tsx — Der minimalistische, brutalistische 3D-Flur.
 *  - Boden, Decke, zwei Seitenwände aus Box-Geometrien (via useMemo memoisiert)
 *  - Spiegelnder Boden (roughness 0.1 / metalness 0.8)
 *  - Vertikale rote Lichtfugen (E&V-Rot) als emissive Akzente → triggern Bloom
 *  - Randloser, leuchtender Flachbildfernseher am Ende des Flurs
 */
export default function Environment() {
  // Z-Spanne des Flurs: etwas hinter dem Kamerastart bis hinter den TV
  const startZ = CAM_START_Z + 1;
  const endZ = TV_Z - 2;
  const length = startZ - endZ; // Gesamttiefe
  const centerZ = (startZ + endZ) / 2;

  const halfW = HALLWAY_WIDTH / 2;

  // ---- Memoisierte Geometrien (einmal erstellt, vielfach instanziiert) ----
  const slabGeometry = useMemo(
    () => new THREE.BoxGeometry(HALLWAY_WIDTH + 1, 0.5, length),
    [length]
  );
  const wallGeometry = useMemo(
    () => new THREE.BoxGeometry(0.5, HALLWAY_HEIGHT, length),
    [length]
  );
  // Eine einzelne, wiederverwendete Wandpaneel-Geometrie für die Relief-Segmente
  const seamGeometry = useMemo(
    () => new THREE.BoxGeometry(0.08, HALLWAY_HEIGHT - 1.2, 0.12),
    []
  );

  // Z-Positionen der vertikalen Lichtfugen zwischen den Segmenten
  const seamPositions = useMemo(() => {
    const arr: number[] = [];
    for (let i = 1; i < SEGMENT_COUNT; i++) {
      arr.push(startZ - i * SEGMENT_LENGTH);
    }
    return arr;
  }, [startZ]);

  // ---- Materialien ----
  const floorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#070707",
        roughness: 0.1,
        metalness: 0.8,
      }),
    []
  );
  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0d0d0f",
        roughness: 0.55,
        metalness: 0.35,
      }),
    []
  );
  const ceilingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#080809",
        roughness: 0.7,
        metalness: 0.2,
      }),
    []
  );
  const redSeamMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#E4002B",
        emissive: "#E4002B",
        emissiveIntensity: 3.2,
        roughness: 0.4,
        metalness: 0.1,
        toneMapped: false,
      }),
    []
  );

  return (
    <group>
      {/* ===================== BODEN (spiegelnd) ===================== */}
      <mesh
        geometry={slabGeometry}
        material={floorMaterial}
        position={[0, -0.25, centerZ]}
        receiveShadow
      />

      {/* ===================== DECKE ===================== */}
      <mesh
        geometry={slabGeometry}
        material={ceilingMaterial}
        position={[0, HALLWAY_HEIGHT + 0.25, centerZ]}
        receiveShadow
      />

      {/* ===================== SEITENWÄNDE ===================== */}
      <mesh
        geometry={wallGeometry}
        material={wallMaterial}
        position={[-halfW, HALLWAY_HEIGHT / 2, centerZ]}
        receiveShadow
        castShadow
      />
      <mesh
        geometry={wallGeometry}
        material={wallMaterial}
        position={[halfW, HALLWAY_HEIGHT / 2, centerZ]}
        receiveShadow
        castShadow
      />

      {/* ===================== VERTIKALE ROTE LICHTFUGEN ===================== */}
      {seamPositions.map((z, i) => (
        <group key={`seam-${i}`}>
          <mesh
            geometry={seamGeometry}
            material={redSeamMaterial}
            position={[-halfW + 0.28, HALLWAY_HEIGHT / 2, z]}
          />
          <mesh
            geometry={seamGeometry}
            material={redSeamMaterial}
            position={[halfW - 0.28, HALLWAY_HEIGHT / 2, z]}
          />
        </group>
      ))}

      {/* ===================== TV-EINHEIT AM FLUR-ENDE ===================== */}
      <group position={[0, TV_CENTER_Y, TV_Z]}>
        {/* Randloser, dunkler Korpus (minimal größer als der Screen) */}
        <mesh castShadow>
          <boxGeometry args={[TV_WIDTH + 0.12, TV_HEIGHT + 0.12, 0.18]} />
          <meshStandardMaterial
            color="#0a0a0b"
            roughness={0.25}
            metalness={0.9}
          />
        </mesh>

        {/* Leuchtender Bildschirm (Backlight) — Quelle für den Bloom-Glow.
            Das eigentliche News-UI liegt als <Html>-Overlay exakt davor. */}
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[TV_WIDTH, TV_HEIGHT]} />
          <meshStandardMaterial
            color="#0b0d12"
            emissive="#10131a"
            emissiveIntensity={2.4}
            roughness={0.2}
            metalness={0.1}
            toneMapped={false}
          />
        </mesh>

        {/* Roter Akzentstreifen unter dem TV — leuchtet (Bloom) */}
        <mesh position={[0, -TV_HEIGHT / 2 - 0.12, 0.12]}>
          <boxGeometry args={[TV_WIDTH + 0.12, 0.05, 0.05]} />
          <meshStandardMaterial
            color="#E4002B"
            emissive="#E4002B"
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>

        {/* Schwache Bodenreflexion / Halo-Plane hinter dem TV */}
        <mesh position={[0, 0, -0.2]}>
          <planeGeometry args={[TV_WIDTH + 2.5, TV_HEIGHT + 2]} />
          <meshBasicMaterial color="#E4002B" transparent opacity={0.04} />
        </mesh>
      </group>
    </group>
  );
}
