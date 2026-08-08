import type { Metadata } from "next";

import { AnalysisWorkspace } from "@/components/analysis/analysis-workspace";

export const metadata: Metadata = {
  title: "Analysis | VisionDoc AI",
};

export default function AnalysisPage() {
  return <AnalysisWorkspace />;
}
