"use client";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="content-section min-h-screen bg-black py-32 px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Left Column */}
          <div>
            <h2 className="text-6xl md:text-8xl font-light text-white mb-12 tracking-tight">
              About
            </h2>
            <div className="h-px w-24 bg-red-600 mb-12" />
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              We build brand identities that merge strategic thinking with
              timeless aesthetics master. Through research-driven concepts and
              bold visual statements.
            </p>
          </div>

          {/* Right Column - Services */}
          <div className="space-y-16">
            <div>
              <h3 className="text-2xl text-white font-light mb-8 tracking-wide">
                Services
              </h3>
              <ul className="space-y-4 text-gray-500">
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  Brand Strategy
                </li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  Visual Identity
                </li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  Digital Experience
                </li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  Motion Design
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl text-white font-light mb-8 tracking-wide">
                Capabilities
              </h3>
              <ul className="space-y-4 text-gray-500">
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  Strategic Thinking
                </li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  Creative Direction
                </li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  Brand Development
                </li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  Digital Innovation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
