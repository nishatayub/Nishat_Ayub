"use client";

import { useState } from "react";

const projects = [
  {
    title: "LearnSphere",
    link: "https://learnsphere-gu3p.onrender.com/",
    tags: ["ASP.NET Core MVC", "C#"],
    paragraphs: [
      "An enterprise-grade Learning Management System built to deliver structured, accessible, and engaging educational experiences — for students, instructors, and administrators alike.",
      "Built on ASP.NET Core MVC, pairing a robust backend architecture with an intuitive, easy-to-navigate interface.",
    ],
  },
  {
    title: "BHome",
    link: "https://b-home-kuun.vercel.app/",
    tags: ["Next.js", "Supabase", "TypeScript"],
    paragraphs: [
      "Discover, evaluate, and book accommodations with confidence — AI-powered matching, trust scoring, and community verification, wrapped in an immersive property experience.",
      "Built with Next.js, TypeScript, and Supabase, with three core systems — matching, trust scoring, and verification — laying the foundation for a full rental marketplace.",
    ],
  },
  {
    title: "Codeunity",
    link: "https://cunity.vercel.app/",
    tags: ["React", "WebSockets", "Monaco Editor"],
    paragraphs: [
      "A real-time collaborative code editor where every keystroke syncs instantly across every connected browser — built for pairing, teaching, and late-night debugging with a friend three time zones away.",
      "Under the hood: WebSockets for live sync, Monaco for the editing experience, and a conflict layer so two people can type on the same line without stepping on each other.",
    ],
  },
];

export default function FeaturedProjectCard() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <div className="flex h-full flex-col border-[1.5px] border-ink bg-paper">
      <div className="flex items-center justify-between border-b-[1.5px] border-ink px-6 py-4">
        <h3 className="font-mono text-lg text-ink">{project.title}</h3>
        <div className="flex items-center gap-1.5">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(i)}
              aria-label={`Show ${p.title}`}
              className={`h-2.5 w-2.5 rounded-full border-[1.5px] border-ink transition-colors ${
                i === active ? "bg-ink" : "bg-paper"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-4 px-6 py-6">
        {project.paragraphs.map((p, i) => (
          <p key={i} className="font-mono text-sm leading-relaxed text-ink">
            {p}
          </p>
        ))}

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span key={tag} className="border-[1px] border-ink px-2 py-0.5 font-mono text-xs text-ink">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block w-fit pt-2 font-mono text-sm text-ink underline underline-offset-4"
        >
          Visit project →
        </a>
      </div>
    </div>
  );
}
