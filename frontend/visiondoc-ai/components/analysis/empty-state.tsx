import { ScanLine } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-secondary/30 px-6 py-16 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
        <ScanLine className="h-6 w-6 text-muted-foreground" />
      </span>
      <p className="text-sm font-medium text-foreground">
        No analysis yet
      </p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Upload a chest X-ray above and click Analyze to see detections and
        an AI-generated explanation here.
      </p>
    </div>
  );
}
