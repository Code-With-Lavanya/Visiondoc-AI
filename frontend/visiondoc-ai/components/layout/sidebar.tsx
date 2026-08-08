"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Info,
  LayoutDashboard,
  History as HistoryIcon,
  ScanLine,
  Settings as SettingsIcon,
  X,
} from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS = {
  LayoutDashboard,
  ScanLine,
  History: HistoryIcon,
  Settings: SettingsIcon,
  Info,
};

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.icon];
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card py-6 lg:flex">
        <div className="mb-8 px-4">
          <Logo />
        </div>
        {nav}
        <div className="mt-auto px-4 pt-6">
          <div className="rounded-lg border border-dashed border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
            YOLO11 + Gemini powered chest X-ray triage. For research and
            educational use only.
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="relative flex h-full w-64 flex-col bg-card py-6 shadow-card animate-slide-up">
            <div className="mb-8 flex items-center justify-between px-4">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}
