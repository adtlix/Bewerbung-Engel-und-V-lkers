/**
 * Zentrale Geometrie- & Kamera-Konstanten.
 * Werden von Environment.tsx, CameraScroll.tsx und ScreenUI.tsx geteilt,
 * damit Flur, Kamerafahrt und TV-Overlay exakt zueinander passen.
 */

// Flur-Dimensionen
export const HALLWAY_WIDTH = 6; // X
export const HALLWAY_HEIGHT = 5; // Y
export const SEGMENT_LENGTH = 8; // Tiefe eines Wand-Segments (Z)
export const SEGMENT_COUNT = 6; // Anzahl Segmente entlang des Flurs

// Gesamtlänge des Flurs in -Z-Richtung
export const HALLWAY_DEPTH = SEGMENT_LENGTH * SEGMENT_COUNT; // 48

// Position des TV-Bildschirms am Ende des Flurs (Z), Plane schaut Richtung +Z
export const TV_Z = -HALLWAY_DEPTH + 2; // -46
export const TV_WIDTH = 3.9;
export const TV_HEIGHT = 2.2;
export const TV_CENTER_Y = HALLWAY_HEIGHT / 2; // vertikal mittig im Flur

// Kamera-Wegpunkte (Z-Achse). Augenhöhe konstant.
export const CAM_EYE_Y = TV_CENTER_Y - 0.1;
export const CAM_START_Z = 7; // am Flur-Eingang
export const CAM_END_Z = TV_Z + 6.5; // gestoppt, zentriert vor dem TV
