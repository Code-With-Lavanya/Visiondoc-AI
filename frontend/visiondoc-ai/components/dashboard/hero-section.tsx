import Link from "next/link";
import { ArrowRight, ScanLine, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 to-background">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <Badge variant="secondary" className="mb-5 gap-1.5 bg-white shadow-sm">
          <Sparkles className="h-3 w-3 text-primary" />
          YOLO11 detection &middot; Gemini explanations
        </Badge>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          {APP_NAME}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          {APP_DESCRIPTION}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/analysis">
              <ScanLine className="h-4 w-4" />
              Start New Analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/about">Learn how it works</Link>
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          For research and educational purposes only. Not a substitute for
          professional medical diagnosis.
        </p>
      </div>
    </section>
  );
}
