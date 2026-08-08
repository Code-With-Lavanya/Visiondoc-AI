"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ANALYZING_MESSAGES } from "@/lib/constants";
import { predictXray, toAppError } from "@/services/api";
import type { AnalysisStatus, AppError, PredictionResponse } from "@/types";

export function useAnalyze() {
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<AppError | null>(null);
  const requestInFlight = useRef(false);
  const messageTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (messageTimer.current) clearInterval(messageTimer.current);
    };
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setProgress(0);
    setMessageIndex(0);
    setResult(null);
    setError(null);
  }, []);

  const analyze = useCallback(async (file: File) => {
    // Guard against duplicate/overlapping requests.
    if (requestInFlight.current) return;
    requestInFlight.current = true;

    setError(null);
    setResult(null);
    setStatus("uploading");
    setProgress(0);
    setMessageIndex(0);

    // Rotate through cosmetic status messages while the backend processes
    // the image (YOLO inference + Gemini explanation aren't individually
    // reported by the API, so this keeps the user informed regardless).
    messageTimer.current = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % ANALYZING_MESSAGES.length);
    }, 1800);

    try {
      const data = await predictXray(file, (percent) => {
        setProgress(percent);
        if (percent >= 100) {
          setStatus("analyzing");
        }
      });

      setResult(data);
      setStatus("success");
      setProgress(100);
    } catch (err) {
      setError(toAppError(err));
      setStatus("error");
    } finally {
      requestInFlight.current = false;
      if (messageTimer.current) {
        clearInterval(messageTimer.current);
        messageTimer.current = null;
      }
    }
  }, []);

  return {
    status,
    progress,
    message: ANALYZING_MESSAGES[messageIndex],
    result,
    error,
    analyze,
    reset,
    isLoading: status === "uploading" || status === "analyzing",
  };
}
