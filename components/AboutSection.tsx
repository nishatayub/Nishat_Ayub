"use client";

const stack = ["Next.js", "React", "TypeScript", "Node.js", "Python", "C#", "PostgreSQL", "MongoDB", "Docker"];

const alsoKnownFor = [
  "Research: GROMACS molecular dynamics simulations & protein docking pipelines",
  "Leadership: led a 4-person team to the PromptRepo national finals",
  "Debate: 2nd runner-up, PersonX Debate Competition",
  "Open source: merged a doc contribution into freeCodeCamp's curriculum",
];

export default function AboutSection() {
  return (
    <div className="mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="mb-6 font-pixel text-3xl leading-tight text-ink sm:text-4xl">
            BUILDS PRODUCTS.
            <br />
            RUNS SIMULATIONS.
            <br />
            WINS ARGUMENTS.
          </h2>
          <p className="mb-4 max-w-md font-mono text-base leading-relaxed text-ink">
            I'm a full-stack developer and CS undergrad (Kalvium Software Product
            Engineering program, Lovely Professional University), currently splitting
            time between shipping product at Moonpreneur and running molecular dynamics
            simulations as a research intern at IIT Delhi's Kusuma School of Biological
            Sciences — because picking one discipline felt too easy.
          </p>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="mb-4 font-mono text-lg text-ink">Stack</h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="border-[1.5px] border-ink px-3 py-1 font-mono text-sm text-ink">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-lg text-ink">Also known for</h3>
            <ul className="space-y-2">
              {alsoKnownFor.map((item) => (
                <li key={item} className="flex items-start gap-2 font-mono text-sm leading-relaxed text-ink">
                  <span className="shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
