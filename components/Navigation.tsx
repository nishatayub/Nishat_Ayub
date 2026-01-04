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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-white font-light text-lg sm:text-xl tracking-wider">
            NA
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-8 lg:space-x-12">
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden mt-4 space-y-4 pb-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm tracking-wider uppercase"
                  onClick={() => {
                    setActiveSection(item.name);
                    setMenuOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
