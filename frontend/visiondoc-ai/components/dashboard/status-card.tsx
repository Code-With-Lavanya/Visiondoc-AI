import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: "success" | "muted" | "destructive" | "checking";
}

const TONE_STYLES: Record<StatusCardProps["tone"], { dot: string; text: string; iconBg: string; iconText: string }> = {
  success: { dot: "bg-success", text: "text-success", iconBg: "bg-success/10", iconText: "text-success" },
  muted: { dot: "bg-muted-foreground/40", text: "text-muted-foreground", iconBg: "bg-secondary", iconText: "text-muted-foreground" },
  destructive: { dot: "bg-destructive", text: "text-destructive", iconBg: "bg-destructive/10", iconText: "text-destructive" },
  checking: { dot: "bg-amber-400 animate-pulse", text: "text-amber-700", iconBg: "bg-amber-50", iconText: "text-amber-600" },
};

export function StatusCard({ icon: Icon, label, value, tone }: StatusCardProps) {
  const styles = TONE_STYLES[tone];

  return (
    <Card className="transition-shadow hover:shadow-card">
      <CardContent className="flex items-center gap-4 p-5">
        <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-lg", styles.iconBg)}>
          <Icon className={cn("h-5 w-5", styles.iconText)} strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-muted-foreground">{label}</p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
            <p className={cn("text-sm font-semibold", styles.text)}>{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
