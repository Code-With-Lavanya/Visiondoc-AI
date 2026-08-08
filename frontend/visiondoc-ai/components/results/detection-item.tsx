import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { confidenceTier, formatConfidence } from "@/lib/utils";
import type { Detection } from "@/types";

const TIER_BADGE_VARIANT = {
  high: "success",
  medium: "outline",
  low: "destructive",
} as const;

const TIER_LABEL = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
} as const;

export function DetectionItem({
  detection,
  index,
}: {
  detection: Detection;
  index: number;
}) {
  const tier = confidenceTier(detection.confidence);
  const [x1, y1, x2, y2] = detection.bbox;

  return (
    <div className="rounded-lg border border-border p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-foreground">
          Detection #{index + 1}
          {detection.label ? ` · ${detection.label}` : ""}
        </p>
        <Badge variant={TIER_BADGE_VARIANT[tier]}>{TIER_LABEL[tier]}</Badge>
      </div>

      <div className="mt-2.5 flex items-center gap-3">
        <Progress value={detection.confidence * 100} className="h-1.5" />
        <span className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums text-foreground">
          {formatConfidence(detection.confidence)}
        </span>
      </div>

      <p className="mt-2 font-mono text-[11px] text-muted-foreground">
        bbox: [{x1.toFixed(0)}, {y1.toFixed(0)}, {x2.toFixed(0)}, {y2.toFixed(0)}]
      </p>
    </div>
  );
}
