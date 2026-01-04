"use client";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="content-section min-h-screen bg-black py-32 px-8 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center">
          <h2 className="text-6xl md:text-9xl font-light text-white mb-12 tracking-tight">
            Let's Talk
          </h2>
          
          <div className="h-px w-32 bg-red-600 mx-auto mb-16" />
          
          <p className="text-2xl text-gray-400 font-light mb-20 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear about it.
          </p>

          <div className="space-y-8">
            <a
              href="mailto:hello@nishatayub.com"
              className="block text-3xl md:text-5xl font-light text-white hover:text-red-600 transition-colors duration-300"
            >
              hello@nishatayub.com
            </a>
            
            <div className="flex justify-center space-x-12 text-gray-500 text-sm tracking-wider uppercase">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Behance
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-12 border-t border-zinc-900">
          <div className="flex justify-between items-center text-gray-600 text-sm">
            <p>© 2026 Nishat Ayub. All rights reserved.</p>
            <p>Designed & Developed with precision</p>
          </div>
        </div>
      </div>
    </section>
  );
}
