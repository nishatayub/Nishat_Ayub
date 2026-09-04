"use client";

export type View = "home" | "about" | "work" | "contact";

const navItems: { name: string; view: View }[] = [
  { name: "About", view: "about" },
  { name: "Work", view: "work" },
  { name: "Contact", view: "contact" },
];

export default function Navigation({
  active,
  onNavigate,
}: {
  active: View;
  onNavigate: (view: View) => void;
}) {
  return (
    <nav className="z-50 shrink-0 bg-paper">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
        {active !== "home" ? (
          <button
            onClick={() => onNavigate("home")}
            className="whitespace-nowrap font-pixel text-base text-ink sm:text-lg"
          >
            NISHAT AYUB
          </button>
        ) : (
          <span />
        )}

        <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.view}>
                <button
                  onClick={() => onNavigate(item.view)}
                  className={`font-mono text-sm transition-colors ${
                    active === item.view ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 font-mono text-sm text-ink">
            <span className="h-2 w-2 rounded-full bg-ink" />
            Available
          </div>
        </div>
      </div>
    </nav>
  );
}
