import { FileSearch } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Future-ready OCR section.
 *
 * The backend does not implement OCR yet, so `ocrText` will always be
 * `undefined` today — this renders the required placeholder copy. Once the
 * backend starts returning an `ocr_text` field on the prediction response,
 * this component will automatically render the extracted text instead,
 * with no changes needed elsewhere in the UI.
 */
export function OcrSection({ ocrText }: { ocrText?: string }) {
  const hasOcrText = Boolean(ocrText && ocrText.trim().length > 0);

  return (
    <Card className={hasOcrText ? undefined : "border-dashed bg-secondary/30"}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <FileSearch className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base">OCR Report Extraction</CardTitle>
        </div>
        <Badge variant="muted">{hasOcrText ? "Extracted" : "Coming Soon"}</Badge>
      </CardHeader>
      <CardContent>
        {hasOcrText ? (
          <p className="whitespace-pre-line rounded-lg bg-secondary/60 p-3 font-mono text-xs leading-relaxed text-foreground">
            {ocrText}
          </p>
        ) : (
          <div className="rounded-lg bg-background px-3 py-6 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              OCR feature coming soon.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              No report extracted. This section will display extracted
              report text once OCR integration is complete.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
