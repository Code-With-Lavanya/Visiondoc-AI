import { ScanEye } from "lucide-react";

import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <ScanEye className="h-5 w-5" strokeWidth={2.25} />
      </span>
      {!iconOnly && (
        <span className="text-base font-semibold tracking-tight text-foreground">
          {APP_NAME}
        </span>
      )}
    </div>
  );
}
