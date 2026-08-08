import type { HistoryItem } from "@/types";

/**
 * Static placeholder data for the History page.
 * This screen is intentionally not wired to the backend yet — VisionDoc AI
 * does not currently persist past analyses. Replace with a real API call
 * once a history endpoint exists.
 */
export const DUMMY_HISTORY: HistoryItem[] = [
  {
    id: "hist_1",
    fileName: "chest_xray_0142.png",
    date: "2026-08-05T09:24:00",
    totalDetections: 2,
    status: "completed",
  },
  {
    id: "hist_2",
    fileName: "patient_scan_cxr.jpg",
    date: "2026-08-04T15:02:00",
    totalDetections: 0,
    status: "completed",
  },
  {
    id: "hist_3",
    fileName: "xray_frontal_view.jpeg",
    date: "2026-08-03T11:47:00",
    totalDetections: 1,
    status: "completed",
  },
  {
    id: "hist_4",
    fileName: "cxr_sample_09.png",
    date: "2026-08-01T18:13:00",
    totalDetections: 3,
    status: "completed",
  },
  {
    id: "hist_5",
    fileName: "upload_failed_scan.jpg",
    date: "2026-07-30T08:56:00",
    totalDetections: 0,
    status: "failed",
  },
];
