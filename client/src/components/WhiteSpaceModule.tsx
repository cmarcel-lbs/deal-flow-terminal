import { dealflowData } from "@/data/dealflow";
import { ModuleShell, CategoryBadge } from "./ModuleShell";
import { Define } from "./Glossary";
import { ExternalLink, Target } from "lucide-react";

function sizeBadge(size: string): { label: string; color: string } {
  const lower = (size || "").toLowerCase();
  if (lower.includes("massive") || lower.includes("$10b") || lower.includes("$50b") || lower.includes("$100b") || lower.includes("$200b"))
    return { label: "MASSIVE TAM", color: "hsl(0 70% 55%)" };
  if (lower.includes("$1b") || lower.includes("$4") || lower.includes("$5b") || lower.includes("$10b"))
    return { label: "$1B+ TAM", color: "hsl(38 95% 55%)" };
  if (lower.includes("$500m") || lower.includes("growing") || lower.includes("fragmented"))
    return { label: "GROWING", color: "hsl(178 60% 45%)" };
  return { label: "NICHE / DEEP", color: "hsl(280 60% 65%)" };
}

export function WhiteSpaceModule() {
  const rows = dealflowData.whitespace;
  return (
    <ModuleShell
      id="whitespace"
      code="GAP"
      title="White Space Map"
      subtitle="Clear demand · no funded solution · build or invest"
      helper="Problems people are actively complaining about online with no well-funded company tackling them yet. These are the 'why doesn't this exist?' opportunities."
    count={rows.length}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
        {rows.map((w, i) => {
          const sb = sizeBadge(w.market_size_qualitative);
          return (
            <article
              key={i}
              className="border border-card-border rounded-md p-3 bg-card/40 hover-elevate flex flex-col gap-2 relative overflow-hidden"
              data-testid={`card-whitespace-${i}`}
            >
              {/* Accent stripe */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: sb.color }}
              />
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <Target className="size-4 mt-0.5 text-primary flex-shrink-0" />
                  <h3 className="font-semibold text-sm leading-snug">
                    <Define term="White Space">{w.title}</Define>
                  </h3>
                </div>
                <CategoryBadge category={w.category} />
              </div>

              <p className="text-xs text-muted-foreground line-clamp-3">
                {w.why_matters_plain}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs mt-1">
                <div>
                  <div className="cell text-muted-foreground mb-0.5">DEMAND</div>
                  <div className="text-foreground/90 line-clamp-2">{w.demand_signal}</div>
                </div>
                <div>
                  <div className="cell text-muted-foreground mb-0.5">WHY GAP</div>
                  <div className="text-foreground/90 line-clamp-2">{w.why_gap}</div>
                </div>
              </div>

              <div className="border-t border-card-border/60 pt-2 mt-auto flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="cell px-1.5 py-0.5 rounded font-semibold"
                    style={{ color: sb.color, background: `${sb.color}15` }}
                  >
                    <Define term="TAM">{sb.label}</Define>
                  </span>
                  <span className="cell text-muted-foreground truncate max-w-[180px]">
                    {w.business_model}
                  </span>
                </div>
                {w.sources && w.sources[0] && (
                  <a
                    href={w.sources[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                    title={w.sources[0].name}
                    data-testid={`link-whitespace-source-${i}`}
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </ModuleShell>
  );
}
