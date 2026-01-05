"use client";

import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      name: "CODEUNITY",
      description: "Real-time collaborative code editor",
      link: "https://cunity.vercel.app/",
      tech: ["React", "WebSockets", "Monaco Editor"],
    },
    {
      name: "AFFIRMO",
      description: "Feel-good compliments and affirmations",
      link: "https://affirmo.vercel.app/",
      tech: ["Next.js", "AI", "TailwindCSS"],
    },
    {
      name: "ECHOES",
      description: "AI-powered closure through personalized letters",
      link: "https://echoes-beta.vercel.app/",
      tech: ["AI", "OpenAI", "Emotion Analysis"],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              Projects
            </h1>
            <Link 
              href="/"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-xs sm:text-sm tracking-wider uppercase"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 h-[calc(100vh-80px)] overflow-hidden">
        <div className="mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl">
            A collection of my work — each project built with passion and purpose.
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-4 sm:space-y-5">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group/project"
            >
              <div className="relative overflow-hidden">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight cursor-pointer relative inline-block">
                  <span className="relative inline-block group-hover/project:bg-red-600 group-hover/project:px-8 group-hover/project:py-3 transition-all duration-700 ease-out rounded-lg">
                    <span className="relative z-10 text-red-600 group-hover/project:text-black transition-colors duration-300">
                      {project.name.split("").map((char, i) => (
                        <span
                          key={i}
                          className="inline-block"
                          style={{ display: char === " " ? "inline" : "inline-block", width: char === " " ? "0.3em" : "auto" }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    </span>
                  </span>
                </h2>
              </div>

              {/* Project Details */}
              <div className="mt-2 sm:mt-3 ml-0 sm:ml-4 space-y-2">
                <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-zinc-900 text-gray-400 rounded-full border border-zinc-800 group-hover/project:border-red-600 group-hover/project:text-red-400 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Visit Link */}
                <div className="flex items-center text-xs sm:text-sm font-medium text-gray-500 group-hover/project:text-red-600 transition-colors duration-300 pt-1">
                  <span className="mr-2">Visit Project</span>
                  <svg 
                    className="w-5 h-5 transform group-hover/project:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Divider */}
              <div className="mt-4 sm:mt-5 h-px bg-zinc-800 group-hover/project:bg-red-600 transition-colors duration-500" />
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
