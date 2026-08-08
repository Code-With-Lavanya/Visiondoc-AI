import { Loader2, ScanLine } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

export function AnalyzeButton({ onClick, disabled, isLoading }: AnalyzeButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      size="lg"
      className="w-full gap-2 sm:w-auto"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <ScanLine className="h-4 w-4" />
          Analyze X-ray
        </>
      )}
    </Button>
  );
}
