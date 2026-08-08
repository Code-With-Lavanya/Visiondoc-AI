export const APP_NAME = "VisionDoc AI";
export const APP_TAGLINE = "AI-Powered Chest X-ray Analysis";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION =
  "VisionDoc AI helps clinicians and researchers rapidly triage chest X-rays using a YOLO11 detection model, OCR-based report text extraction, and an AI-generated, patient-friendly explanation.";

export const GITHUB_URL = "https://github.com/your-username/visiondoc-ai";

export const DEFAULT_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export const PREDICT_ENDPOINT = "/predict/";

export const API_BASE_URL_STORAGE_KEY = "visiondoc:api-base-url";

export const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];
export const SUPPORTED_FORMATS_LABEL = "JPG, JPEG, PNG or WEBP";
export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: "LayoutDashboard" },
  { label: "Analysis", href: "/analysis", icon: "ScanLine" },
  { label: "History", href: "/history", icon: "History" },
  { label: "Settings", href: "/settings", icon: "Settings" },
  { label: "About", href: "/about", icon: "Info" },
] as const;

export const ANALYZING_MESSAGES = [
  "Uploading X-ray to backend...",
  "Running YOLO11 object detection...",
  "Localizing regions of interest...",
  "Generating AI explanation with Gemini...",
  "Finalizing results...",
];
