"use client";

import type { View } from "./Navigation";
import ProcessStepper from "./ProcessStepper";
import FeaturedProjectCard from "./FeaturedProjectCard";

export default function LandingPage({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="font-pixel text-[36px] leading-[1.1] text-ink sm:text-[48px] lg:text-[64px]">
        NISHAT AYUB
      </h1>

      <p className="mt-5 max-w-2xl font-mono text-lg text-ink sm:text-xl">
        With the right stack, any idea can become a <span className="font-bold">product.</span>
      </p>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-8">
        <ProcessStepper onNavigate={onNavigate} />
        <FeaturedProjectCard />
      </div>

      <div className="mt-6">
        <a
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <span aria-hidden>↻</span> See more projects
        </a>
      </div>
    </div>
  );
}
