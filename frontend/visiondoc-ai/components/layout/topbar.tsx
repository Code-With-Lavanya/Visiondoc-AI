"use client";

import { Menu } from "lucide-react";

import { BackendStatusBadge } from "@/components/shared/backend-status-badge";
import { useBackendStatus } from "@/hooks/use-backend-status";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { status } = useBackendStatus();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="rounded-md p-2 text-muted-foreground hover:bg-secondary lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm text-muted-foreground">
          AI-assisted chest X-ray triage workspace
        </p>
      </div>

      <BackendStatusBadge status={status} />
    </header>
  );
}
