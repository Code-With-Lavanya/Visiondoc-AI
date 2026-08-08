import type { Metadata } from "next";
import { TriangleAlert, Github, ScanEye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { APP_NAME, APP_VERSION, GITHUB_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About | VisionDoc AI",
};

const TECH_STACK = [
  "Next.js 15",
  "TypeScript",
  "Tailwind CSS",
  "FastAPI",
  "YOLO11",
  "Gemini LLM",
  "PaddleOCR",
];

const PIPELINE_STEPS = [
  {
    title: "Upload",
    description: "A chest X-ray image is uploaded from the Analysis page.",
  },
  {
    title: "Detection",
    description:
      "A YOLO11 model detects regions of interest and returns bounding boxes with confidence scores.",
  },
  {
    title: "OCR",
    description:
      "Report text present in the image is extracted and returned alongside the detections.",
  },
  {
    title: "Explanation",
    description:
      "Gemini converts the detection and OCR data into a structured, patient-friendly explanation.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <ScanEye className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            About {APP_NAME}
          </h1>
          <p className="text-sm text-muted-foreground">Version {APP_VERSION}</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">What is VisionDoc AI?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            VisionDoc AI is an AI-assisted triage dashboard for chest X-rays.
            It combines a YOLO11 object detection model, OCR-based report
            text extraction, and an AI-generated explanation to help
            clinicians and researchers quickly review each image.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">How it works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {PIPELINE_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Tech stack</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Alert variant="warning">
        <TriangleAlert />
        <AlertTitle>Medical disclaimer</AlertTitle>
        <AlertDescription>
          VisionDoc AI is provided for research and educational purposes
          only. It is not a certified medical device and must not be used
          as a substitute for professional diagnosis, advice, or treatment
          from a qualified healthcare provider.
        </AlertDescription>
      </Alert>

      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card py-3 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-secondary"
      >
        <Github className="h-4 w-4" />
        View project on GitHub
      </a>
    </div>
  );
}
