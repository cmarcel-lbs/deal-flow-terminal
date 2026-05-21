import { useEffect, useState } from "react";
import { Activity, RefreshCw, Sun, Moon } from "lucide-react";
import { Helper } from "./Glossary";

export function TerminalHeader({
  totalSignals,
  asOfDate,
}: {
  totalSignals: number;
  asOfDate: string;
}) {
  const [now, setNow] = useState(new Date());
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.classList.add("light");
    else root.classList.remove("light");
  }, [theme]);

  const time = now.toLocaleTimeString("en-US", {
    hour12: false,
    timeZone: "America/New_York",
  });
  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "America/New_York",
  });

  return (
    <header className="border-b border-card-border bg-sidebar">
      <div className="px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {/* Left: brand */}
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 32 32" className="size-6" aria-label="DFT logo">
            <rect x="2" y="2" width="28" height="28" rx="2" fill="hsl(var(--primary))" />
            <text
              x="16"
              y="22"
              textAnchor="middle"
              fontFamily="JetBrains Mono"
              fontSize="13"
              fontWeight="700"
              fill="hsl(var(--primary-foreground))"
            >
              DF
            </text>
          </svg>
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-bold tracking-tight text-base" data-testid="text-brand">
              DEAL FLOW TERMINAL
            </span>
            <span className="cell text-muted-foreground">v1.0 / FOUNDER EDITION</span>
          </div>
        </div>

        {/* Right: live stats */}
        <div className="flex items-center gap-3 md:gap-5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Activity className="size-3 text-[hsl(var(--signal-up))] pulse-amber" />
            <span className="cell text-muted-foreground">SIGNALS</span>
            <span className="cell text-primary font-semibold">{totalSignals}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <RefreshCw className="size-3 text-muted-foreground" />
            <span className="cell text-muted-foreground">AS-OF</span>
            <span className="cell font-semibold">{asOfDate}</span>
            <Helper text="When this dashboard was last refreshed. Re-run the scanner weekly to update all signals." />
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <span className="cell text-muted-foreground">NYC</span>
            <span className="cell font-semibold text-[hsl(var(--accent))]" data-testid="text-clock">
              {time}
            </span>
            <span className="cell text-muted-foreground">/ {date}</span>
          </div>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="size-7 grid place-items-center rounded border border-card-border hover-elevate"
            aria-label="Toggle theme"
            data-testid="button-theme"
          >
            {theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
