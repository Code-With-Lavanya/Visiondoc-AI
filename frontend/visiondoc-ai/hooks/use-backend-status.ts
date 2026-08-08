"use client";

import { useEffect, useState } from "react";

import { checkBackendHealth } from "@/services/api";
import type { BackendStatus } from "@/types";

const POLL_INTERVAL_MS = 30_000;

export function useBackendStatus() {
  const [status, setStatus] = useState<BackendStatus>("checking");
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const online = await checkBackendHealth();
      if (cancelled) return;
      setStatus(online ? "online" : "offline");
      setLastChecked(new Date());
    }

    check();
    const interval = setInterval(check, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { status, lastChecked };
}
