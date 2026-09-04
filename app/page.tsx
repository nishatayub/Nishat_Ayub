"use client";

import { useState } from "react";
import Navigation, { type View } from "@/components/Navigation";
import LandingPage from "@/components/LandingPage";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [view, setView] = useState<View>("home");

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-paper">
      <Navigation active={view} onNavigate={setView} />
      <div key={view} className="min-h-0 flex-1 animate-in fade-in duration-200 overflow-y-auto">
        {view === "home" && <LandingPage onNavigate={setView} />}
        {view === "about" && <AboutSection />}
        {view === "work" && <WorkSection />}
        {view === "contact" && <ContactSection />}
      </div>
    </main>
  );
}
