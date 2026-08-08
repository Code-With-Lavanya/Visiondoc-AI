"use client";

import { useState } from "react";
import { Check, Copy, FileSearch } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/** Displays the report text extracted from the X-ray by the backend's OCR step. */
export function OcrSection({ ocrText }: { ocrText: string }) {
  const [copied, setCopied] = useState(false);
  const hasText = Boolean(ocrText && ocrText.trim().length > 0);

  const handleCopy = async () => {
    if (!hasText) return;
    await navigator.clipboard.writeText(ocrText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <FileSearch className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">OCR Report Extraction</CardTitle>
        </div>
        <Badge variant={hasText ? "success" : "muted"}>
          {hasText ? "Extracted" : "No text found"}
        </Badge>
      </CardHeader>
      <CardContent>
        {hasText ? (
          <div className="space-y-2">
            <div className="max-h-64 overflow-y-auto rounded-lg bg-secondary/60 p-3">
              <p className="whitespace-pre-line font-mono text-xs leading-relaxed text-foreground">
                {ocrText}
              </p>
            </div>
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy text
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <p className="rounded-lg bg-secondary/60 px-3 py-6 text-center text-sm text-muted-foreground">
            No report text was found in this image.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
