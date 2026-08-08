"use client";

import { RotateCcw } from "lucide-react";

import { AnalyzingIndicator } from "@/components/analysis/analyzing-indicator";
import { EmptyState } from "@/components/analysis/empty-state";
import { AnalyzeButton } from "@/components/upload/analyze-button";
import { UploadDropzone } from "@/components/upload/upload-dropzone";
import { ErrorBanner } from "@/components/shared/error-banner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultDashboard } from "@/components/results/result-dashboard";
import { ResultSkeleton } from "@/components/results/result-skeleton";
import { useAnalyze } from "@/hooks/use-analyze";
import { useImageUpload } from "@/hooks/use-image-upload";

export function AnalysisWorkspace() {
  const { status, progress, message, result, error, analyze, reset, isLoading } =
    useAnalyze();
  const upload = useImageUpload({ disabled: isLoading });

  const handleAnalyze = () => {
    if (!upload.file || isLoading) return;
    analyze(upload.file);
  };

  const handleReset = () => {
    reset();
    upload.removeFile();
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          New Analysis
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a chest X-ray image to run YOLO11 detection and generate an
          AI explanation.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Upload X-ray</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <UploadDropzone upload={upload} disabled={isLoading} />

          <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">
              Your image is sent directly to your local VisionDoc AI backend
              for inference.
            </p>
            <div className="flex gap-2">
              {(result || error) && !isLoading && (
                <Button variant="outline" onClick={handleReset} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              )}
              <AnalyzeButton
                onClick={handleAnalyze}
                disabled={!upload.file}
                isLoading={isLoading}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {error && status === "error" && <ErrorBanner error={error} onDismiss={reset} />}

      <div>
        {isLoading ? (
          <div className="space-y-6">
            <AnalyzingIndicator
              message={message}
              progress={progress}
              isUploading={status === "uploading" && progress < 100}
            />
            <ResultSkeleton />
          </div>
        ) : result ? (
          <ResultDashboard result={result} imageUrl={upload.previewUrl ?? ""} />
        ) : (
          !error && <EmptyState />
        )}
      </div>
    </div>
  );
}
