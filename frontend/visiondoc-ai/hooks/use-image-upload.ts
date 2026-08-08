"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  SUPPORTED_FORMATS,
  SUPPORTED_FORMATS_LABEL,
} from "@/lib/constants";
import type { AppError } from "@/types";

interface UseImageUploadOptions {
  disabled?: boolean;
}

export function useImageUpload({ disabled }: UseImageUploadOptions = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<AppError | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clean up the generated object URL whenever the file changes or unmounts.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const validate = useCallback((candidate: File): AppError | null => {
    if (!SUPPORTED_FORMATS.includes(candidate.type)) {
      return {
        kind: "validation",
        title: "Unsupported file type",
        message: `Please upload a ${SUPPORTED_FORMATS_LABEL} image.`,
      };
    }
    if (candidate.size > MAX_FILE_SIZE_BYTES) {
      return {
        kind: "validation",
        title: "File too large",
        message: `Please upload an image smaller than ${MAX_FILE_SIZE_MB}MB.`,
      };
    }
    return null;
  }, []);

  const selectFile = useCallback(
    (candidate: File) => {
      const validationError = validate(candidate);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      setFile(candidate);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(candidate);
      });
    },
    [validate]
  );

  const removeFile = useCallback(() => {
    setFile(null);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const candidate = event.target.files?.[0];
      if (candidate) selectFile(candidate);
    },
    [selectFile]
  );

  const onBrowseClick = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const dragHandlers = {
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (disabled) return;
      setIsDragging(true);
    },
    onDragLeave: (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
    },
    onDrop: (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const candidate = event.dataTransfer.files?.[0];
      if (candidate) selectFile(candidate);
    },
  };

  return {
    file,
    previewUrl,
    error,
    isDragging,
    inputRef,
    selectFile,
    removeFile,
    onInputChange,
    onBrowseClick,
    dragHandlers,
  };
}
