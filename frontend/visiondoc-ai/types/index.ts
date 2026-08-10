/**
 * Shared type definitions for VisionDoc AI.
 *
 * IMPORTANT — Future-ready design:
 * The current FastAPI backend only returns `total_detections`, `detections`,
 * and `ai_explanation`. Fields like `ocr_text`, `annotated_image`, and
 * `medical_report` do NOT exist yet on the backend, but are already modeled
 * here as OPTIONAL fields. This means:
 *   - The UI can safely read `result.ocr_text` etc. today (it will be
 *     `undefined`, and components render a "coming soon" placeholder).
 *   - When the backend adds these fields later, the UI will automatically
 *     start rendering real data — no type changes or redesign required.
 */

/** A single bounding-box detection returned by the YOLO model. */
export interface Detection {
  /** Model confidence score between 0 and 1. */
  confidence: number;
  /** Bounding box as [x1, y1, x2, y2] in original image pixel coordinates. */
  bbox: [number, number, number, number];
  /** Optional class label — not returned by the backend yet, but future-ready. */
  label?: string;
}

/** The full prediction response from POST /predict/. */
export interface PredictionResponse {
  total_detections: number;
  detections: Detection[];
  ai_explanation: string;

  // ---- Future / not-yet-implemented backend fields ----
  /** Extracted report text once OCR is integrated. */
  ocr_text?: string;
  /** Base64 or URL of a server-annotated image, once/if the backend renders it. */
  annotated_image?: string;
  /** Structured medical report text, if the backend adds this later. */
  medical_report?: string;
}

export type BackendStatus = "checking" | "online" | "offline";

export type AnalysisStatus = "idle" | "uploading" | "analyzing" | "success" | "error";

export interface AppError {
  title: string;
  message: string;
  kind: "network" | "validation" | "backend" | "empty" | "unknown";
}

export interface HistoryItem {
  id: string;
  fileName: string;
  date: string;
  totalDetections: number;
  status: "completed" | "failed";
}
