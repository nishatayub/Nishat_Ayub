"use client";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="content-section min-h-screen bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-light text-white mb-8 sm:mb-10 md:mb-12 tracking-tight">
            Let's Talk
          </h2>
          
          <div className="h-px w-24 sm:w-28 md:w-32 bg-red-600 mx-auto mb-12 sm:mb-14 md:mb-16" />
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light mb-16 sm:mb-18 md:mb-20 max-w-2xl mx-auto px-4">
            Have a project in mind? We'd love to hear about it.
          </p>

          <div className="space-y-6 sm:space-y-8">
            <a
              href="mailto:hello@nishatayub.com"
              className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white hover:text-red-600 transition-colors duration-300 break-all"
            >
              hello@nishatayub.com
            </a>
            
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 text-gray-500 text-xs sm:text-sm tracking-wider uppercase">
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
        <div className="mt-24 sm:mt-28 md:mt-32 pt-8 sm:pt-10 md:pt-12 border-t border-zinc-900">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 text-gray-600 text-xs sm:text-sm text-center sm:text-left">
            <p>© 2026 Nishat Ayub. All rights reserved.</p>
            <p>Designed & Developed with precision</p>
          </div>
        </div>
      </div>
    </section>
  );
}
