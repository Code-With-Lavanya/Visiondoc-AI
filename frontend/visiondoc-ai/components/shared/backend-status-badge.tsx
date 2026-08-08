"use client";

import { cn } from "@/lib/utils";
import type { BackendStatus } from "@/types";

const STATUS_CONFIG: Record<
  BackendStatus,
  { label: string; dot: string; text: string }
> = {
  checking: { label: "Checking backend...", dot: "bg-amber-400 animate-pulse", text: "text-amber-700" },
  online: { label: "Backend Online", dot: "bg-success", text: "text-success" },
  offline: { label: "Backend Offline", dot: "bg-destructive", text: "text-destructive" },
};

export function BackendStatusBadge({ status }: { status: BackendStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium",
        config.text
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", config.dot)} />
      {config.label}
    </div>
  );
}
