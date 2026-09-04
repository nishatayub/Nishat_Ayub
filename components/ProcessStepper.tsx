"use client";

import type { View } from "./Navigation";
import { GMAIL_COMPOSE_LINK } from "@/lib/links";

export default function ProcessStepper({ onNavigate }: { onNavigate: (view: View) => void }) {
  const steps = [
    {
      title: "Full Stack Developer",
      desc: "Shipping production apps end-to-end — React/Next.js interfaces on Node and ASP.NET backends.",
      cta: "View my work",
      action: () => onNavigate("work"),
    },
    {
      title: "Research Assistant",
      desc: "Running GROMACS molecular dynamics simulations and docking pipelines at IIT Delhi.",
      cta: "Read more",
      action: () => onNavigate("work"),
    },
    {
      title: "Debater & Team Lead",
      desc: "National debate runner-up and cross-functional team lead — the non-technical half of the resume.",
      cta: "Get in touch",
      action: () => window.open(GMAIL_COMPOSE_LINK, "_blank"),
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {steps.map((step, i) => (
        <div key={i} className="group relative pb-8 pl-10 last:pb-0">
          {i < steps.length - 1 && (
            <span className="absolute left-[7px] top-4 bottom-0 w-px bg-ink/30" />
          )}
          <span className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-[1.5px] border-ink bg-paper transition-colors group-hover:bg-ink" />
          <p className="mb-1 font-mono text-lg text-ink-muted transition-colors group-hover:text-ink">
            {step.title}
          </p>
          <p className="mb-4 font-mono text-sm leading-relaxed text-ink-muted transition-colors group-hover:text-ink">
            {step.desc}
          </p>
          <button
            onClick={step.action}
            className="block w-full border-[1.5px] border-ink-muted px-6 py-3 text-center font-mono text-sm text-ink-muted transition-colors group-hover:border-ink group-hover:text-ink hover:!border-ink hover:!bg-ink hover:!text-paper"
          >
            {step.cta}
          </button>
        </div>
      ))}
    </div>
  );
}
