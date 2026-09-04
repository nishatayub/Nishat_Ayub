"use client";

import Link from "next/link";

const projects = [
  {
    name: "LearnSphere",
    description: "Enterprise-grade LMS delivering structured, accessible learning experiences for students, instructors, and admins.",
    link: "https://learnsphere-gu3p.onrender.com/",
    tech: ["ASP.NET Core MVC", "C#"],
  },
  {
    name: "BHome",
    description: "AI-powered rental platform for discovering, evaluating, and booking accommodations with trust scoring and community verification.",
    link: "https://b-home-kuun.vercel.app/",
    tech: ["Next.js", "Supabase", "TypeScript"],
  },
  {
    name: "Codeunity",
    description: "Real-time collaborative code editor with syntax highlighting and multi-user support.",
    link: "https://cunity.vercel.app/",
    tech: ["React", "WebSockets", "Monaco Editor"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b-[1.5px] border-ink bg-paper">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="whitespace-nowrap font-pixel text-base text-ink sm:text-lg">
            NISHAT AYUB
          </Link>
          <Link href="/" className="font-mono text-sm text-ink underline underline-offset-4">
            Back to home
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="mb-4 font-mono text-sm text-ink-muted">(all projects)</p>
        <h1 className="mb-4 font-pixel text-4xl leading-tight text-ink sm:text-5xl">
          PROJECTS
        </h1>
        <p className="mb-12 max-w-xl font-mono text-base text-ink">
          A collection of things I've built — each one solving a real problem.
        </p>

        <div className="border-[1.5px] border-ink">
          {projects.map((project, i) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group grid grid-cols-1 gap-4 px-6 py-8 transition-colors hover:bg-ink hover:text-paper sm:grid-cols-[1fr_2fr_auto] sm:items-center sm:gap-8 ${
                i > 0 ? "border-t-[1.5px] border-ink" : ""
              }`}
            >
              <h2 className="font-mono text-2xl text-ink group-hover:text-paper">{project.name}</h2>
              <p className="font-mono text-sm leading-relaxed text-ink group-hover:text-paper">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="border-[1px] border-ink px-2 py-0.5 font-mono text-xs text-ink group-hover:border-paper group-hover:text-paper"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
