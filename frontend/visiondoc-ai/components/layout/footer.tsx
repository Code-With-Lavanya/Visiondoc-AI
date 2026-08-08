import { Github } from "lucide-react";

import { APP_NAME, APP_VERSION, GITHUB_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 py-5 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME}. For research and
          educational purposes only — not a substitute for professional
          medical diagnosis.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          <span className="rounded-full bg-secondary px-2 py-0.5 font-medium">
            v{APP_VERSION}
          </span>
        </div>
      </div>
    </footer>
  );
}
