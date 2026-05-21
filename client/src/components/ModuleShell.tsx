import type { ReactNode } from "react";
import { Helper } from "./Glossary";

interface Props {
  id: string;
  code: string; // 3-letter code like RND, BUZ
  title: string;
  subtitle?: string;
  helper: string;
  count: number;
  children: ReactNode;
  toolbar?: ReactNode;
}

export function ModuleShell({
  id,
  code,
  title,
  subtitle,
  helper,
  count,
  children,
  toolbar,
}: Props) {
  return (
    <section
      id={id}
      className="border border-card-border rounded-md bg-card overflow-hidden"
      data-testid={`section-${id}`}
    >
      <header className="px-4 py-2.5 border-b border-card-border flex items-center justify-between gap-3 bg-card/40">
        <div className="flex items-center gap-3 min-w-0">
          <span className="cell px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold flex-shrink-0">
            {code}
          </span>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold tracking-tight flex items-center gap-1.5">
              <span className="truncate">{title}</span>
              <Helper text={helper} />
            </h2>
            {subtitle && (
              <div className="cell text-muted-foreground truncate">{subtitle}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {toolbar}
          <span className="cell text-muted-foreground">{count} items</span>
        </div>
      </header>
      <div>{children}</div>
    </section>
  );
}

export function CategoryBadge({ category }: { category: string }) {
  const hue =
    category === "Business/Professional Services"
      ? "--cat-pro"
      : category === "AI and Biotech"
      ? "--cat-ai"
      : "--cat-deep";
  const short =
    category === "Business/Professional Services"
      ? "PRO"
      : category === "AI and Biotech"
      ? "AIB"
      : "DTP";
  return (
    <span
      className="cell px-1.5 py-0.5 rounded border font-semibold"
      style={{
        color: `hsl(var(${hue}))`,
        borderColor: `hsl(var(${hue}) / 0.4)`,
        background: `hsl(var(${hue}) / 0.08)`,
      }}
    >
      {short}
    </span>
  );
}
