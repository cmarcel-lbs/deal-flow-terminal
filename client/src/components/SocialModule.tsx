import { dealflowData } from "@/data/dealflow";
import { ModuleShell, CategoryBadge } from "./ModuleShell";
import { ExternalLink, MessageSquare } from "lucide-react";
import { platformColor } from "@/lib/dealflow-utils";

export function SocialModule() {
  const rows = dealflowData.social;
  return (
    <ModuleShell
      id="social"
      code="CHT"
      title="Social Chatter"
      subtitle="What founders & VCs are actually saying · last 30 days"
      helper="High-signal posts from X, Reddit, and LinkedIn surfaced from your three focus areas. Read these to learn how operators are framing problems — and to find people worth following."
      count={rows.length}
    >
      <ul className="divide-y divide-card-border">
        {rows.map((s, i) => (
          <li
            key={i}
            className="px-3 py-3 hover-elevate flex flex-col md:flex-row md:items-start gap-2 md:gap-4"
            data-testid={`row-social-${i}`}
          >
            <div className="flex items-center gap-2 md:w-44 flex-shrink-0">
              <span
                className="cell px-1.5 py-0.5 rounded font-bold flex-shrink-0"
                style={{
                  color: platformColor(s.platform),
                  borderColor: platformColor(s.platform),
                  background: `${platformColor(s.platform)}10`,
                  border: `1px solid ${platformColor(s.platform)}40`,
                }}
              >
                {s.platform.toUpperCase()}
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold truncate">{s.author}</div>
                <div className="cell text-muted-foreground truncate">
                  {s.author_role}
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CategoryBadge category={s.category} />
                <span className="text-xs font-semibold text-foreground/90 truncate">
                  {s.topic}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{s.summary_plain}</p>
              <div className="flex items-start gap-1.5 mt-1.5 text-xs text-foreground/80">
                <MessageSquare className="size-3 mt-0.5 text-primary flex-shrink-0" />
                <span className="italic line-clamp-1">→ {s.why_matters}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 md:flex-col md:items-end md:gap-1 flex-shrink-0">
              <span className="cell text-muted-foreground truncate max-w-[160px] text-right">
                {s.engagement}
              </span>
              {s.post_url && (
                <a
                  href={s.post_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cell text-[hsl(var(--accent))] hover:underline flex items-center gap-1"
                  data-testid={`link-social-${i}`}
                >
                  OPEN <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </ModuleShell>
  );
}
