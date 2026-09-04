"use client";

const experience = [
  {
    role: "Research Intern, Computational Biology & Molecular Dynamics",
    org: "Kusuma School of Biological Sciences, IIT Delhi — under Dr. Saurabh Raj",
    meta: "Jun 2026 – Present · Remote",
    bullets: [
      "Ran 15+ GROMACS molecular dynamics simulations on a GPU-accelerated HPC cluster (PBS job scheduling) to study protein–ssDNA and protein–dsDNA binding approach dynamics at 2nm separation across trajectory frames.",
      "Performed protein–protein and protein–nucleic acid docking using HDOCK and HADDOCK, screening 50+ candidate poses to identify binding conformations for simulation.",
      "Built a Python pipeline to generate contact-residue heatmaps across 100+ docked structures, paired with literature review to identify open gaps in current binding models — cutting manual analysis time significantly.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    org: "Moonpreneur",
    meta: "Dec 2025 – May 2026 · Remote",
    bullets: [
      "Contributed across 3 product surfaces (MoonTinker, the LMS, and the company website), shipping 5+ documentation updates and resolving 10+ audit findings.",
      "Standardized UI patterns and shipped logo-related frontend updates across 5+ pages of MoonTinker, a Next.js and TypeScript-based application, reducing cross-page visual inconsistencies.",
      "Collaborated with senior developers through 50+ code reviews and pair debugging sessions, aligning implementation with existing architecture and team coding standards.",
    ],
  },
];

export default function WorkSection() {
  return (
    <div className="mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <h2 className="mb-5 font-pixel text-2xl leading-tight text-ink sm:text-3xl">
        EXPERIENCE
      </h2>

      <div className="space-y-4">
        {experience.map((job) => (
          <div key={job.role} className="border-[1.5px] border-ink px-5 py-4">
            <div className="mb-0.5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-mono text-base text-ink">{job.role}</h3>
              <span className="font-mono text-xs text-ink-muted">{job.meta}</span>
            </div>
            <p className="mb-2.5 font-mono text-xs text-ink-muted">{job.org}</p>
            <ul className="space-y-1.5">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 font-mono text-xs leading-relaxed text-ink sm:text-sm">
                  <span className="shrink-0">—</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
