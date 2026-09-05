"use client";

import type { View } from "./Navigation";

export default function ProcessStepper({ onNavigate }: { onNavigate: (view: View) => void }) {
  const steps = [
    {
      title: "Frontend Developer",
      desc: "Turning designs and rough ideas into interfaces that feel obvious — React, Next.js, and a weakness for perfect spacing.",
      cta: "See the interfaces",
      action: () => onNavigate("work"),
    },
    {
      title: "Full Stack Developer",
      desc: "Same eye for the UI, now wired to Node, PostgreSQL, and ASP.NET on the backend — shipped end-to-end, not just styled.",
      cta: "View my work",
      action: () => onNavigate("work"),
    },
    {
      title: "Research Assistant",
      desc: "Trading component trees for molecular ones — GROMACS simulations and docking pipelines at IIT Delhi.",
      cta: "Read the research",
      action: () => onNavigate("work"),
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
