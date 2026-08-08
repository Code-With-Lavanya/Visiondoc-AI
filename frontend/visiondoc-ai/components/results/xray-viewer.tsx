"use client";

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { confidenceTier, formatConfidence } from "@/lib/utils";
import type { Detection } from "@/types";

interface XrayViewerProps {
  imageUrl: string;
  detections: Detection[];
}

const TIER_STROKE: Record<"high" | "medium" | "low", string> = {
  high: "#16a34a",
  medium: "#d97706",
  low: "#dc2626",
};

export function XrayViewer({ imageUrl, detections }: XrayViewerProps) {
  const [dimensions, setDimensions] = useState<{ w: number; h: number } | null>(
    null
  );
  const [showBoxes, setShowBoxes] = useState(true);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Original X-ray</p>
        <div className="flex items-center gap-2">
          <Label htmlFor="toggle-boxes" className="text-xs text-muted-foreground">
            Show detections
          </Label>
          <Switch
            id="toggle-boxes"
            checked={showBoxes}
            onCheckedChange={setShowBoxes}
            aria-label="Toggle bounding boxes"
          />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-foreground/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Chest X-ray"
          className="block h-auto w-full select-none"
          onLoad={(event) => {
            const target = event.currentTarget;
            setDimensions({ w: target.naturalWidth, h: target.naturalHeight });
          }}
        />

        {showBoxes && dimensions && (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
            preserveAspectRatio="none"
          >
            {detections.map((detection, index) => {
              const [x1, y1, x2, y2] = detection.bbox;
              const tier = confidenceTier(detection.confidence);
              const color = TIER_STROKE[tier];
              const strokeWidth = Math.max(dimensions.w, dimensions.h) * 0.004;
              const labelY = Math.max(y1 - strokeWidth * 2, strokeWidth * 6);

              return (
                <g key={index}>
                  <rect
                    x={x1}
                    y={y1}
                    width={Math.max(0, x2 - x1)}
                    height={Math.max(0, y2 - y1)}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    rx={strokeWidth}
                  />
                  <text
                    x={x1}
                    y={labelY}
                    fill={color}
                    fontSize={Math.max(dimensions.w, dimensions.h) * 0.022}
                    fontWeight={700}
                    style={{
                      paintOrder: "stroke",
                      stroke: "white",
                      strokeWidth: strokeWidth * 1.5,
                    }}
                  >
                    #{index + 1} &middot; {formatConfidence(detection.confidence)}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {detections.length === 0 && (
        <p className="text-xs text-muted-foreground">
          No regions of interest were detected in this image.
        </p>
      )}
    </div>
  );
}
