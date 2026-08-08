"use client";

import { TriangleAlert, WifiOff, ImageOff, ServerCrash, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { AppError } from "@/types";

const ICONS = {
  network: WifiOff,
  validation: ImageOff,
  backend: ServerCrash,
  empty: TriangleAlert,
  unknown: TriangleAlert,
};

interface ErrorBannerProps {
  error: AppError;
  onDismiss?: () => void;
}

export function ErrorBanner({ error, onDismiss }: ErrorBannerProps) {
  const Icon = ICONS[error.kind] ?? TriangleAlert;

  return (
    <Alert variant="destructive" className="animate-slide-up">
      <Icon />
      <AlertTitle>{error.title}</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className="absolute right-2 top-2 h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </Alert>
  );
}
