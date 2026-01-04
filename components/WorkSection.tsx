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
      className="content-section min-h-screen bg-black py-32 px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-light text-white mb-20 tracking-tight">
          Selected Work
        </h2>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group border-t border-zinc-800 pt-8 pb-8 hover:border-red-600 transition-colors duration-500 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-4xl md:text-5xl font-light text-white mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm tracking-wider uppercase">
                    {project.category}
                  </p>
                </div>
                <span className="text-gray-600 text-xl font-light">
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
