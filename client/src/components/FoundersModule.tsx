import { dealflowData } from "@/data/dealflow";
import { ModuleShell, CategoryBadge } from "./ModuleShell";
import { Define } from "./Glossary";
import { ExternalLink, TrendingUp } from "lucide-react";

export function FoundersModule() {
  const rows = dealflowData.founders;
  return (
    <ModuleShell
      id="founders"
      code="BUZ"
      title="Rising Founders"
      subtitle="Buzz without big-VC backing — early enough to actually talk to"
      helper="Founders gaining real attention online but who haven't taken a check from a top-tier venture fund yet. These are the people you can still cold-DM and meet at events."
      count={rows.length}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 p-3">
        {rows.map((f, i) => (
          <article
            key={i}
            className="border border-card-border rounded-md p-3 bg-card/40 hover-elevate flex flex-col gap-2"
            data-testid={`card-founder-${i}`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="font-semibold text-sm leading-tight">
                  {f.founder_name}
                </div>
                <div className="cell text-muted-foreground mt-0.5 truncate">
                  {f.company_name.toUpperCase()}
                </div>
              </div>
              <CategoryBadge category={f.category} />
            </div>

            {/* Body */}
            <p className="text-xs text-foreground/80 line-clamp-3">
              {f.description_plain}
            </p>

            {/* Buzz signal */}
            <div className="flex items-start gap-1.5 text-xs">
              <TrendingUp className="size-3 mt-0.5 text-[hsl(var(--accent))] flex-shrink-0" />
              <span className="text-foreground/90 line-clamp-2">
                {f.buzz_signal}
              </span>
            </div>

            {/* Funding badge + links */}
            <div className="mt-auto pt-2 border-t border-card-border/60 flex items-center justify-between gap-2 min-w-0">
              <span
                className="cell px-1.5 py-0.5 rounded border border-[hsl(var(--signal-up)/0.4)] text-[hsl(var(--signal-up))] bg-[hsl(var(--signal-up)/0.06)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]"
                title={f.funding_status}
              >
                <Define term="Bootstrapped">
                  {f.funding_status.length > 22
                    ? f.funding_status.slice(0, 22) + "…"
                    : f.funding_status}
                </Define>
              </span>
              <div className="flex items-center gap-2">
                {f.social_url && (
                  <a
                    href={f.social_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cell text-muted-foreground hover:text-primary"
                    data-testid={`link-social-founder-${i}`}
                  >
                    FOLLOW ↗
                  </a>
                )}
                {f.source_url && (
                  <a
                    href={f.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                    title={f.source_name}
                    data-testid={`link-source-founder-${i}`}
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </ModuleShell>
  );
}
