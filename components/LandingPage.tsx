"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [isRedVersion, setIsRedVersion] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-box",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.5,
          ease: "power3.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateAge = () => {
    const birthDate = new Date(2006, 10, 30); // November is month 10 (0-indexed)
    const today = currentTime;
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }
    
    if (today.getDate() < birthDate.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }
    
    return { years, months };
  };

  const bgClass = isRedVersion ? "bg-red-600" : "bg-black";
  const textPrimary = isRedVersion ? "text-black" : "text-red-600";
  const textSecondary = isRedVersion ? "text-black/80" : "text-red-600/80";
  const textTertiary = isRedVersion ? "text-black/70" : "text-red-600/70";
  const textMuted = isRedVersion ? "text-black/60" : "text-red-600/60";
  const borderClass = isRedVersion ? "border-black/20" : "border-red-600/20";
  const borderHover = isRedVersion ? "hover:border-black" : "hover:border-red-600";
  const hoverPrimary = isRedVersion ? "hover:text-black" : "hover:text-red-600";
  const hoverWhite = isRedVersion ? "hover:text-white" : "hover:text-red-400";

  return (
    <section
      ref={heroRef}
      className={`relative h-screen w-full overflow-hidden p-4 sm:p-6 md:p-8 lg:p-12 transition-colors duration-500 ${bgClass}`}
    >
      {/* Version Toggle - Top Center */}
      <div className="fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setIsRedVersion(!isRedVersion)}
          className={`text-xs sm:text-sm font-bold tracking-widest transition-colors duration-300 ${textPrimary} ${hoverWhite}`}
        >
          {isRedVersion ? "RED VERSION" : "BLACK VERSION"}
        </button>
      </div>

      <div className="relative z-10 h-full grid grid-cols-12 grid-rows-12 gap-2 sm:gap-0">
        {/* Top Left - ABOUT ME */}
        <div className="col-span-12 sm:col-span-6 md:col-span-3 row-span-2 p-3 sm:p-4">
          <h3 className={`text-base md:text-lg font-bold tracking-wider ${textPrimary} mb-3 transition-colors duration-500`}>ABOUT ME</h3>
          <p className={`text-xs md:text-sm ${textSecondary} leading-relaxed transition-colors duration-500`}>
            I'm a passionate Full Stack Developer from India with expertise in modern web technologies. I love building robust applications and solving complex technical challenges.
          </p>
          
        </div>

        {/* Top Right - SKILLS */}
        <div className="col-span-12 sm:col-span-6 md:col-span-3 md:col-start-10 row-span-2 p-3 sm:p-4 text-left sm:text-right">
          <h3 className={`text-base md:text-lg font-bold tracking-wider ${textPrimary} mb-3 transition-colors duration-500`}>SKILLS</h3>
          <div className="space-y-3">
            <div>
              <p className={`text-xs ${textMuted} mb-2 transition-colors duration-500`}>STACK</p>
              <div className={`flex flex-wrap gap-2 justify-start sm:justify-end ${textSecondary} transition-colors duration-500`}>
                <span className="text-sm font-bold">MERN</span>
                <span className="text-sm font-bold">Python</span>
                <span className="text-sm font-bold">Java</span>
                <span className="text-sm font-bold">C++</span>
              </div>
            </div>
            <div>
              <p className={`text-xs ${textMuted} mb-2 transition-colors duration-500`}>TOOLS</p>
              <div className={`flex flex-wrap gap-2 justify-start sm:justify-end ${textSecondary} transition-colors duration-500`}>
                <span className="text-sm font-bold">Figma</span>
                <span className="text-sm font-bold">Docker</span>
                <span className="text-sm font-bold">REST API</span>
                <span className="text-sm font-bold">CI/CD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side - WORK */}
        <div className="col-span-12 sm:col-span-6 md:col-span-2 row-span-4 md:row-span-6 row-start-3 md:row-start-4 p-3 sm:p-4">
          <h3 className={`text-base md:text-lg font-bold tracking-wider ${textPrimary} mb-4 transition-colors duration-500`}>WORK</h3>
          <div className="space-y-3 sm:space-y-4">
            <a 
              href="https://cunity.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block ${textSecondary} ${hoverPrimary} transition-all duration-300 group hover:scale-105`}
            >
              <p className={`text-sm md:text-base font-bold mb-1 ${textPrimary} transition-colors`}>
                Codeunity
              </p>
              <p className="text-xs leading-tight">Real-time collaborative code editor</p>
            </a>
            <a 
              href="https://affirmo.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block ${textSecondary} ${hoverPrimary} transition-all duration-300 group hover:scale-105`}
            >
              <p className={`text-sm md:text-base font-bold mb-1 ${textPrimary} transition-colors`}>
                Affirmo
              </p>
              <p className="text-xs leading-tight">Feel-good compliments and affirmations</p>
            </a>
            <a 
              href="https://echoes-beta.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block ${textSecondary} ${hoverPrimary} transition-all duration-300 group hover:scale-105`}
            >
              <p className={`text-sm md:text-base font-bold mb-1 ${textPrimary} transition-colors`}>
                Echoes
              </p>
              <p className="text-xs leading-tight">AI-powered closure through personalized letters</p>
            </a>
          </div>
        </div>

        {/* Center - NISHAT AYUB */}
        <div className="col-span-12 md:col-span-8 md:col-start-3 row-span-4 md:row-span-6 row-start-7 md:row-start-4 flex flex-col items-center justify-center relative overflow-hidden group/name">
          <h1 
            ref={nameRef}
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-4 cursor-default relative z-10 transition-all duration-300`}
          >
            <span className="relative inline-block">
              <span className={`relative z-10 ${textPrimary} transition-colors duration-300`}>
                {"NISHAT AYUB".split("").map((char, i) => (
                  <span
                    key={i}
                    ref={(el) => { lettersRef.current[i] = el; }}
                    className="inline-block relative"
                    style={{ display: char === " " ? "inline" : "inline-block", width: char === " " ? "0.3em" : "auto" }}
                  >
                    {char === " " ? "\u00A0" : char}
                    <span 
                      className={`absolute inset-0 ${isRedVersion ? "text-red-600" : "text-black"} opacity-0 group-hover/name:opacity-100 transition-opacity duration-700`}
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  </span>
                ))}
              </span>
              <span 
                className={`absolute inset-0 -inset-x-12 -inset-y-6 ${isRedVersion ? "bg-black" : "bg-red-600"} -z-10 scale-x-0 origin-left group-hover/name:scale-x-100 transition-transform duration-700 ease-out rounded-lg`}
              />
            </span>
          </h1>
          <div className={`h-1 w-32 sm:w-48 ${isRedVersion ? "bg-black" : "bg-red-600"} transition-all duration-500`} />
        </div>

        {/* Right Side - DATE/AGE/TIME */}
        <div className="col-span-12 sm:col-span-6 md:col-span-2 md:col-start-11 row-span-2 md:row-span-4 row-start-11 md:row-start-5 flex flex-col items-start sm:items-end justify-center p-3 sm:p-4 text-left sm:text-right">
          <p className={`text-xs md:text-sm ${textMuted} mb-2 transition-colors duration-500`}>
            {currentTime.getFullYear()} {currentTime.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()}
          </p>
          <p className={`text-4xl sm:text-5xl md:text-6xl font-bold ${textPrimary} mb-2 transition-colors duration-500`}>
            {calculateAge().years} Y {calculateAge().months} M
          </p>
          <p className={`text-base md:text-lg font-mono ${textMuted} transition-colors duration-500`}>
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
          </p>
        </div>

        {/* Bottom Left - Tagline */}
        <div className="hidden md:flex col-span-4 row-span-2 row-start-11 p-4 items-end">
          <p className={`text-sm md:text-base font-bold ${textPrimary} tracking-wider transition-colors duration-500 uppercase`}>
            Strategic thinking meets timeless design
          </p>
        </div>

        {/* Bottom Center - CTA */}
        <div className="col-span-12 md:col-span-4 md:col-start-5 row-span-2 md:row-start-11 p-3 sm:p-4 flex flex-col items-center justify-end gap-3">
          <p className={`text-xs ${textMuted} transition-colors duration-500`}>AVAILABLE FOR NEW PROJECTS</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link 
              href="/projects"
              className={`px-6 py-2.5 ${isRedVersion ? 'bg-black text-red-600 hover:bg-black/80' : 'bg-red-600 text-black hover:bg-red-700'} font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg text-center`}
            >
              VIEW PROJECTS
            </Link>
            <a 
              href="https://www.linkedin.com/in/nishat-ayub/"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-2.5 border-2 ${isRedVersion ? 'border-black text-black hover:bg-black hover:text-red-600' : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-black'} font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 text-center`}
            >
              HIRE ME
            </a>
          </div>
        </div>

        {/* Bottom Right - CONTACT */}
        <div className="hidden md:flex col-span-4 col-start-9 row-span-2 row-start-11 p-4 flex-col items-end justify-end text-right">
          <h3 className={`text-base md:text-lg font-bold tracking-wider ${textPrimary} mb-2 transition-colors duration-500`}>CONTACT</h3>
          <a 
            href="https://github.com/nishatayub" 
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm ${textSecondary} ${hoverPrimary} transition-colors mb-1`}
          >
            GITHUB
          </a>
          <a 
            href="https://linkedin.com/in/nishat-ayub" 
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm ${textSecondary} ${hoverPrimary} transition-colors mb-1`}
          >
            LINKEDIN
          </a>
          <a 
            href="mailto:nishatayub702@gmail.com"
            className={`text-sm font-bold ${textPrimary} ${hoverWhite} transition-colors`}
          >
            NISHATAYUB702@GMAIL.COM
          </a>
        </div>
      </div>
    </section>
  );
}
