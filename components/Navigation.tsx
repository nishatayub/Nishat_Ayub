"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-white font-light text-xl tracking-wider">
            NA
          </Link>

          {/* Navigation Links */}
          <ul className="flex space-x-12">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm tracking-wider uppercase relative group"
                  onClick={() => setActiveSection(item.name)}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-600 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
