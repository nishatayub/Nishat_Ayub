"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
      className={`relative min-h-screen w-full overflow-x-hidden p-4 md:p-6 lg:p-8 transition-colors duration-500 ${bgClass}`}
    >
      <button
        onClick={() => setIsRedVersion(!isRedVersion)}
        className={`absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 text-xs md:text-sm font-bold tracking-wider transition-colors duration-300 ${textPrimary} ${hoverWhite}`}
      >
        {isRedVersion ? "RED VERSION" : "BLACK VERSION"}
      </button>

      <div className="relative z-10 min-h-screen pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-12 md:grid-rows-12 gap-4 auto-rows-min md:auto-rows-fr">
        <div className={`bento-box md:col-span-3 md:row-span-5 md:row-start-1 border ${borderClass} ${borderHover} p-6 md:p-8 transition-all duration-500`}>
          <h3 className={`text-lg md:text-xl tracking-wider ${textTertiary} mb-4 md:mb-6 font-bold transition-colors duration-500`}>ABOUT ME</h3>
          <p className={`text-sm md:text-base font-semibold ${textSecondary} leading-relaxed transition-colors duration-500`}>
            I'm a passionate Full Stack Developer from India with expertise in modern web technologies. I love building robust applications and solving complex technical challenges.
          </p>
          <p className={`text-sm md:text-base font-semibold ${textSecondary} leading-relaxed mt-4 transition-colors duration-500`}>
            With a strong foundation in the MERN stack, I focus on creating scalable solutions with clean code and efficient architecture. While UI/UX is part of my skillset, my main expertise lies in technical development roles.
          </p>
        </div>

        <div 
          className="bento-box md:col-span-6 md:row-span-5 md:col-start-4 md:row-start-4 flex flex-col items-center justify-center relative overflow-hidden group/name py-12 md:py-0"
        >
          <h1 
            ref={nameRef}
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-6 cursor-default relative z-10 transition-all duration-300`}
          >
            <span className="relative inline-block">
              <span className={`relative z-10 ${textPrimary} transition-colors duration-300`}>
                {"NISHAT AYUB".split("").map((char, i) => (
                  <span
                    key={i}
                    ref={(el) => lettersRef.current[i] = el}
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
                className={`absolute inset-0 -inset-x-8 -inset-y-4 ${isRedVersion ? "bg-black" : "bg-red-600"} -z-10 scale-x-0 origin-left group-hover/name:scale-x-100 transition-transform duration-700 ease-out rounded-lg`}
              />
            </span>
          </h1>
          <div className={`h-1 w-24 md:w-40 ${isRedVersion ? "bg-black" : "bg-red-600"} transition-all duration-500`} />
        </div>

        <div className={`bento-box md:col-span-3 md:row-span-5 md:row-start-6 md:col-start-1 border ${borderClass} ${borderHover} p-6 md:p-8 transition-all duration-500`}>
          <h3 className={`text-lg md:text-xl tracking-wider ${textTertiary} mb-4 md:mb-6 font-bold transition-colors duration-500`}>WORK</h3>
          <div className={`space-y-4 md:space-y-6 transition-colors duration-500`}>
            <a 
              href="https://cunity.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block ${textSecondary} ${hoverPrimary} transition-colors group`}
            >
              <p className="text-xl md:text-2xl font-bold mb-1 flex items-center gap-2">Codeunity <span className="text-base md:text-lg">↗</span></p>
              <p className={`text-xs md:text-sm ${textTertiary}`}>Real-time collaborative code editor for seamless development</p>
            </a>
            <a 
              href="https://affirmo.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block ${textSecondary} ${hoverPrimary} transition-colors group`}
            >
              <p className="text-xl md:text-2xl font-bold mb-1 flex items-center gap-2">Affirmo <span className="text-base md:text-lg">↗</span></p>
              <p className={`text-xs md:text-sm ${textTertiary}`}>Feel-good compliments and affirmations to spread positivity</p>
            </a>
            <a 
              href="https://echoes-beta.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block ${textSecondary} ${hoverPrimary} transition-colors group`}
            >
              <p className="text-xl md:text-2xl font-bold mb-1 flex items-center gap-2">Echoes <span className="text-base md:text-lg">↗</span></p>
              <p className={`text-xs md:text-sm ${textTertiary}`}>AI-powered closure through unspoken words and personalized letters</p>
            </a>
          </div>
        </div>

        <div className={`bento-box md:col-span-3 md:row-span-3 md:col-start-10 md:row-start-1 border ${borderClass} ${borderHover} p-6 md:p-8 transition-all duration-500 text-right`}>
          <h3 className={`text-sm md:text-base tracking-wider ${textTertiary} mb-3 md:mb-4 font-bold transition-colors duration-500`}>SKILLS</h3>
          <div className="space-y-3 md:space-y-4">
            <div>
              <p className={`text-xs md:text-sm ${textMuted} mb-2 font-semibold transition-colors duration-500`}>STACK</p>
              <div className={`flex flex-wrap gap-2 justify-end ${textSecondary} transition-colors duration-500`}>
                <span className="text-sm md:text-base font-bold">MERN</span>
                <span className="text-sm md:text-base font-bold">Python</span>
                <span className="text-sm md:text-base font-bold">Java</span>
                <span className="text-sm md:text-base font-bold">C++</span>
              </div>
            </div>
            <div>
              <p className={`text-xs md:text-sm ${textMuted} mb-2 font-semibold transition-colors duration-500`}>TOOLS</p>
              <div className={`flex flex-wrap gap-2 justify-end ${textSecondary} transition-colors duration-500`}>
                <span className="text-sm md:text-base font-bold">Figma</span>
                <span className="text-sm md:text-base font-bold">Docker</span>
                <span className="text-sm md:text-base font-bold">REST API</span>
                <span className="text-sm md:text-base font-bold">CI/CD</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`bento-box md:col-span-3 md:row-span-2 md:col-start-10 md:row-start-4 border ${borderClass} ${borderHover} flex flex-col justify-between p-4 md:p-4 transition-all duration-500`}>
          <span className={`text-xs md:text-sm font-semibold ${textMuted} transition-colors duration-500 text-left`}>
            {currentTime.getFullYear()} {currentTime.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()}
          </span>
          <div className="flex flex-col items-end text-right gap-1 md:gap-2">
            <span className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textPrimary} transition-colors duration-500`}>
              {calculateAge().years} Y {calculateAge().months} M
            </span>
            <span className={`text-sm md:text-base font-semibold ${textMuted} transition-colors duration-500 font-mono`}>
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </span>
          </div>
        </div>

        <div className={`bento-box md:col-span-2 md:row-span-2 md:col-start-8 md:row-start-11 border ${borderClass} ${borderHover} p-4 md:p-6 flex flex-col justify-end items-end transition-all duration-500 text-right`}>
          <p className={`text-sm md:text-base font-bold ${textTertiary} transition-colors duration-500`}>STATUS</p>
          <p className={`text-lg md:text-xl font-bold ${textPrimary} transition-colors duration-500`}>Available for Work</p>
        </div>

        <div className={`bento-box md:col-span-3 md:row-span-3 md:col-start-10 md:row-start-10 border ${borderClass} ${borderHover} p-4 md:p-6 flex flex-col justify-end items-end transition-all duration-500 text-right`}>
          <h3 className={`text-sm md:text-base tracking-wider ${textTertiary} font-bold transition-colors duration-500 mb-3 md:mb-4`}>GET IN TOUCH</h3>
          <div className="space-y-2 md:space-y-3">
            <a
              href="mailto:nishatayub702@gmail.com"
              className={`block text-lg md:text-2xl font-bold ${textPrimary} ${hoverWhite} transition-colors`}
            >
              EMAIL
            </a>
            <a
              href="https://github.com/nishatayub"
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-lg md:text-2xl font-bold ${textPrimary} ${hoverWhite} transition-colors`}
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com/in/nishat-ayub"
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-lg md:text-2xl font-bold ${textPrimary} ${hoverWhite} transition-colors`}
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
