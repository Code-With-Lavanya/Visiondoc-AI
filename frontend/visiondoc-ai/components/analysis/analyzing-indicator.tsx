import { Loader2 } from "lucide-react";

import { Progress } from "@/components/ui/progress";

interface AnalyzingIndicatorProps {
  message: string;
  progress: number;
  isUploading: boolean;
}

export function AnalyzingIndicator({
  message,
  progress,
  isUploading,
}: AnalyzingIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card px-6 py-10 text-center shadow-soft">
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          Analyzing X-ray...
        </p>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
      <div className="w-full max-w-xs">
        <Progress
          value={progress}
          indeterminate={!isUploading}
          className="h-1.5"
        />
      </div>
    </div>
  );
}
