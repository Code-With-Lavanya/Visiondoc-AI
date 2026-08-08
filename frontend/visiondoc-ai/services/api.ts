import axios, { AxiosError, type AxiosProgressEvent } from "axios";

import {
  API_BASE_URL_STORAGE_KEY,
  DEFAULT_API_BASE_URL,
  PREDICT_ENDPOINT,
} from "@/lib/constants";
import type { AppError, PredictionResponse } from "@/types";

/**
 * Resolve the API base URL. Checks for a user override saved from the
 * Settings page (localStorage) before falling back to the environment
 * variable / default. Safe to call on both server and client.
 */
export function getApiBaseUrl(): string {
  if (typeof window === "undefined") {
    return DEFAULT_API_BASE_URL;
  }
  const stored = window.localStorage.getItem(API_BASE_URL_STORAGE_KEY);
  return stored && stored.trim().length > 0 ? stored : DEFAULT_API_BASE_URL;
}

export function setApiBaseUrl(url: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(API_BASE_URL_STORAGE_KEY, url);
}

function createClient() {
  return axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 60_000,
  });
}

/**
 * Upload a chest X-ray image and retrieve YOLO detections + AI explanation.
 */
export async function predictXray(
  file: File,
  onUploadProgress?: (percent: number) => void
): Promise<PredictionResponse> {
  const client = createClient();
  const formData = new FormData();
  formData.append("file", file);

  const response = await client.post<PredictionResponse>(
    PREDICT_ENDPOINT,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event: AxiosProgressEvent) => {
        if (!onUploadProgress || !event.total) return;
        const percent = Math.round((event.loaded / event.total) * 100);
        onUploadProgress(percent);
      },
    }
  );

  return response.data;
}

/** Ping the backend root endpoint to determine if it's reachable. */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const client = createClient();
    await client.get("/", { timeout: 8_000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Normalize any error thrown during analysis into a consistent, friendly
 * shape the UI can render regardless of the failure cause.
 */
export function toAppError(error: unknown): AppError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.code === "ECONNABORTED") {
      return {
        kind: "network",
        title: "Request timed out",
        message:
          "The backend took too long to respond. Please check that the VisionDoc AI server is running and try again.",
      };
    }

    if (!axiosError.response) {
      return {
        kind: "network",
        title: "Backend unavailable",
        message: `Couldn't reach the VisionDoc AI backend at ${getApiBaseUrl()}. Make sure the FastAPI server is running and reachable.`,
      };
    }

    const status = axiosError.response.status;
    if (status >= 400 && status < 500) {
      return {
        kind: "validation",
        title: "Invalid request",
        message:
          "The backend rejected this image. Please make sure it's a valid chest X-ray file and try again.",
      };
    }

    return {
      kind: "backend",
      title: "Backend error",
      message: `The server responded with an error (status ${status}). Please try again in a moment.`,
    };
  }

  if (error instanceof Error) {
    return {
      kind: "unknown",
      title: "Something went wrong",
      message: error.message || "An unexpected error occurred. Please try again.",
    };
  }

  return {
    kind: "unknown",
    title: "Something went wrong",
    message: "An unexpected error occurred. Please try again.",
  };
}
