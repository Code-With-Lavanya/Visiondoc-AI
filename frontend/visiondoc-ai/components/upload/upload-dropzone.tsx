"use client";

import { Image as ImageIcon, UploadCloud, X } from "lucide-react";

import { ErrorBanner } from "@/components/shared/error-banner";
import { useImageUpload } from "@/hooks/use-image-upload";
import { SUPPORTED_FORMATS_LABEL, MAX_FILE_SIZE_MB } from "@/lib/constants";
import { cn, formatFileSize } from "@/lib/utils";

interface UploadDropzoneProps {
  upload: ReturnType<typeof useImageUpload>;
  disabled?: boolean;
}

export function UploadDropzone({ upload, disabled }: UploadDropzoneProps) {
  const {
    file,
    previewUrl,
    error,
    isDragging,
    inputRef,
    removeFile,
    onInputChange,
    onBrowseClick,
    dragHandlers,
  } = upload;

  return (
    <div className="space-y-3">
      {!file ? (
        <div
          {...dragHandlers}
          onClick={onBrowseClick}
          role="button"
          tabIndex={0}
          aria-disabled={disabled}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") onBrowseClick();
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors",
            isDragging
              ? "border-primary bg-accent/50"
              : "border-border bg-secondary/40 hover:border-primary/50 hover:bg-accent/30",
            disabled && "pointer-events-none opacity-60"
          )}
        >
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <UploadCloud className="h-6 w-6 text-primary" />
          </span>
          <p className="text-sm font-medium text-foreground">
            Drag &amp; drop a chest X-ray here
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            or <span className="font-medium text-primary">browse</span> from
            your device
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Supported formats: {SUPPORTED_FORMATS_LABEL} &middot; Max{" "}
            {MAX_FILE_SIZE_MB}MB
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-soft">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
            {previewUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="X-ray preview"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="truncate text-sm font-medium text-foreground">
                {file.name}
              </p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatFileSize(file.size)}
            </p>
            <p className="mt-2 text-xs text-success">Ready to analyze</p>
          </div>
          <button
            onClick={removeFile}
            disabled={disabled}
            aria-label="Remove image"
            className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:pointer-events-none disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && <ErrorBanner error={error} />}
    </div>
  );
}
