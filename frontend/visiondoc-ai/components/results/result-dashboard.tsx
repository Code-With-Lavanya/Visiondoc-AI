import { AiExplanationCard } from "@/components/results/ai-explanation-card";
import { DetectionSummary } from "@/components/results/detection-summary";
import { OcrSection } from "@/components/results/ocr-section";
import { XrayViewer } from "@/components/results/xray-viewer";
import type { PredictionResponse } from "@/types";

interface ResultDashboardProps {
  result: PredictionResponse;
  imageUrl: string;
}

export function ResultDashboard({ result, imageUrl }: ResultDashboardProps) {
  return (
    <div className="animate-fade-in grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <XrayViewer imageUrl={imageUrl} detections={result.detections} />
      </div>

      <div className="space-y-6 lg:col-span-2">
        <DetectionSummary
          detections={result.detections}
          totalDetections={result.total_detections}
        />
        <AiExplanationCard explanation={result.ai_explanation} />
        <OcrSection ocrText={result.ocr_text} />
      </div>
    </div>
  );
}
