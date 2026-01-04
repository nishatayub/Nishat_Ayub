"use client";

export default function WorkSection() {
  const projects = [
    {
      title: "Brand Identity 01",
      category: "Visual Design",
      year: "2024",
    },
    {
      title: "Brand Identity 02",
      category: "Strategy & Design",
      year: "2024",
    },
    {
      title: "Brand Identity 03",
      category: "Digital Experience",
      year: "2023",
    },
  ];

  return (
    <section
      id="work"
      className="content-section min-h-screen bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-white mb-12 sm:mb-16 md:mb-20 tracking-tight">
          Selected Work
        </h2>

        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group border-t border-zinc-800 pt-6 sm:pt-8 pb-6 sm:pb-8 hover:border-red-600 transition-colors duration-500 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm tracking-wider uppercase">
                    {project.category}
                  </p>
                </div>
                <span className="text-gray-600 text-lg sm:text-xl font-light self-start sm:self-auto">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
