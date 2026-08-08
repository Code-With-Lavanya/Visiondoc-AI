"use client";

import { BrainCircuit, Radar, ServerCog, Sparkles } from "lucide-react";

import { StatusCard } from "@/components/dashboard/status-card";
import { useBackendStatus } from "@/hooks/use-backend-status";

export function StatusCards() {
  const { status } = useBackendStatus();

  const operational = status === "online";
  const tone = status === "checking" ? "checking" : operational ? "success" : "destructive";
  const value =
    status === "checking" ? "Checking..." : operational ? "Operational" : "Unavailable";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatusCard
        icon={ServerCog}
        label="Backend Connected"
        value={status === "checking" ? "Checking..." : operational ? "Connected" : "Disconnected"}
        tone={tone}
      />
      <StatusCard icon={BrainCircuit} label="Model Status" value={value} tone={tone} />
      <StatusCard icon={Radar} label="YOLO11 Detection" value={value} tone={tone} />
      <StatusCard icon={Sparkles} label="Gemini LLM Analysis" value={value} tone={tone} />
    </div>
  );
}
