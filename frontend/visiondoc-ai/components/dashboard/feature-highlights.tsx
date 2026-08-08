import { FileSearch, MessageSquareText, ScanSearch } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  {
    icon: ScanSearch,
    title: "Object Detection",
    description:
      "A YOLO11 model localizes regions of interest in each chest X-ray and returns bounding boxes with confidence scores.",
    badge: null,
  },
  {
    icon: MessageSquareText,
    title: "AI Explanation",
    description:
      "Gemini turns raw detection output into a clear, patient-friendly explanation of the findings.",
    badge: null,
  },
  {
    icon: FileSearch,
    title: "OCR Report Extraction",
    description:
      "Extracts report text found in each X-ray image, shown alongside the detections and AI explanation.",
    badge: null,
  },
];

export function FeatureHighlights() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {FEATURES.map((feature) => (
        <Card key={feature.title}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <feature.icon className="h-5 w-5 text-accent-foreground" />
              </span>
              {feature.badge && (
                <Badge variant="muted" className="text-[10px]">
                  {feature.badge}
                </Badge>
              )}
            </div>
            <CardTitle className="pt-2 text-base">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
