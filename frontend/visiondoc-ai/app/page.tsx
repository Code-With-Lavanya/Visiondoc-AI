import { FeatureHighlights } from "@/components/dashboard/feature-highlights";
import { HeroSection } from "@/components/dashboard/hero-section";
import { StatusCards } from "@/components/dashboard/status-cards";

export default function DashboardPage() {
  return (
    <div className="animate-fade-in pb-12">
      <HeroSection />

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            System Status
          </h2>
          <StatusCards />
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            What VisionDoc AI Does
          </h2>
          <FeatureHighlights />
        </section>
      </div>
    </div>
  );
}
