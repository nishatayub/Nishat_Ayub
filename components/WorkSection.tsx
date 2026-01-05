"use client";

export default function WorkSection() {
  const projects = [
    {
      title: "Codeunity",
      category: "Real-time Collaborative Editor",
      year: "2024",
      description: "A powerful collaborative code editor with real-time synchronization, syntax highlighting, and multi-user support.",
      link: "https://cunity.vercel.app/",
      tags: ["React", "WebSockets", "Monaco Editor"],
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "Affirmo",
      category: "Wellness & Mental Health",
      year: "2024",
      description: "Feel-good compliments and affirmations platform designed to boost positivity and mental wellbeing.",
      link: "https://affirmo.vercel.app/",
      tags: ["Next.js", "AI", "TailwindCSS"],
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Echoes",
      category: "AI-Powered Emotional Closure",
      year: "2024",
      description: "AI-powered platform that helps users find closure through personalized letters and therapeutic content.",
      link: "https://echoes-beta.vercel.app/",
      tags: ["AI", "OpenAI", "Emotion Analysis"],
      color: "from-orange-600 to-red-600"
    },
  ];

  return (
    <section
      id="work"
      className="content-section min-h-screen bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight">
            Selected Work
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl">
            A showcase of my recent projects — each built with passion, precision, and purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-600 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/20"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Thumbnail placeholder with gradient */}
              <div className={`relative h-48 sm:h-56 md:h-64 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg 
                    className="w-16 h-16 text-white/40 group-hover:text-white/60 transition-colors duration-500 group-hover:scale-110 transform-gpu"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:text-red-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-gray-500 text-sm font-light mt-1">
                    {project.year}
                  </span>
                </div>
                
                <p className="text-sm text-red-600 font-medium tracking-wider uppercase mb-4">
                  {project.category}
                </p>
                
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-xs font-medium bg-zinc-800 text-gray-400 rounded-full group-hover:bg-red-600/20 group-hover:text-red-400 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Arrow */}
                <div className="mt-6 flex items-center text-sm font-medium text-gray-500 group-hover:text-red-600 transition-colors duration-300">
                  <span className="mr-2">View Project</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
