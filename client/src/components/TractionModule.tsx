import { dealflowData } from "@/data/dealflow";
import { ModuleShell, CategoryBadge } from "./ModuleShell";
import { ExternalLink, Zap } from "lucide-react";

export function TractionModule() {
  const rows = dealflowData.traction;
  return (
    <ModuleShell
      id="traction"
      code="TRC"
      title="Organic Traction"
      subtitle="Users showing up but the money hasn't · pre-funding signal"
      helper="Products winning real users, revenue, or downloads without raising venture money yet. This is often the cleanest signal that a market wants something."
      count={rows.length}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3">
        {rows.map((t, i) => (
          <article
            key={i}
            className="border border-card-border rounded-md p-3 bg-card/40 hover-elevate"
            data-testid={`card-traction-${i}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{t.product_name}</span>
                  <CategoryBadge category={t.category} />
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {t.description_plain}
                </p>
              </div>
            </div>

            <div className="border border-[hsl(var(--signal-up)/0.4)] bg-[hsl(var(--signal-up)/0.08)] rounded p-2 my-2">
              <div className="flex items-start gap-1.5">
                <Zap className="size-3 mt-0.5 text-[hsl(var(--signal-up))] flex-shrink-0" />
                <div className="text-xs text-foreground/90">{t.traction_signal}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="cell text-muted-foreground truncate max-w-[220px]">
                FUNDING: {t.funding_status}
              </span>
              <div className="flex items-center gap-2">
                {t.product_url && (
                  <a
                    href={t.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cell text-[hsl(var(--accent))] hover:underline"
                    data-testid={`link-product-${i}`}
                  >
                    VIEW PRODUCT ↗
                  </a>
                )}
                {t.source_url && (
                  <a
                    href={t.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                    title={t.source_name}
                    data-testid={`link-source-traction-${i}`}
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
