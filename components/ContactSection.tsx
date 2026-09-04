"use client";

import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { GMAIL_COMPOSE_LINK, GITHUB_LINK, LINKEDIN_LINK, INSTAGRAM_LINK } from "@/lib/links";

const socials = [
  { label: "Email", href: GMAIL_COMPOSE_LINK, Icon: Mail },
  { label: "GitHub", href: GITHUB_LINK, Icon: Github },
  { label: "LinkedIn", href: LINKEDIN_LINK, Icon: Linkedin },
  { label: "Instagram", href: INSTAGRAM_LINK, Icon: Instagram },
];

export default function ContactSection() {
  return (
    <div className="mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="border-[1.5px] border-ink px-6 py-14 text-center sm:px-12 sm:py-16">
        <h2 className="mb-4 font-pixel text-3xl leading-tight text-ink sm:text-5xl">
          LET'S BUILD SOMETHING
        </h2>
        <p className="mb-10 font-mono text-base text-ink">
          Available for new projects — say hi anytime.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-14 w-14 items-center justify-center border-[1.5px] border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <Icon className="h-6 w-6" strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <p className="mt-14 font-mono text-xs text-ink-muted">
          © {new Date().getFullYear()} Nishat Ayub. All rights reserved.
        </p>
      </div>
    </div>
  );
}
