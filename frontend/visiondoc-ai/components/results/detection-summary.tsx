import { Radar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DetectionItem } from "@/components/results/detection-item";
import type { Detection } from "@/types";

export function DetectionSummary({
  detections,
  totalDetections,
}: {
  detections: Detection[];
  totalDetections: number;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Radar className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">Detections</CardTitle>
        </div>
        <Badge variant={totalDetections > 0 ? "default" : "muted"}>
          {totalDetections} found
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {detections.length === 0 ? (
          <p className="rounded-lg bg-secondary/60 px-3 py-4 text-center text-sm text-muted-foreground">
            No bounding boxes were detected in this X-ray.
          </p>
        ) : (
          detections.map((detection, index) => (
            <DetectionItem key={index} detection={detection} index={index} />
          ))
        )}
      </CardContent>
    </Card>
  );
}
