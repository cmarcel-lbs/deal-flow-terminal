import { dealflowData } from "@/data/dealflow";
import { fmtDate, CATEGORY_SHORT } from "@/lib/dealflow-utils";

// Bloomberg-style scrolling ticker of recent rounds.
export function Ticker() {
  const items = [...dealflowData.rounds]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 18);
  // Duplicate for seamless loop
  const looped = [...items, ...items];
  return (
    <div className="border-y border-card-border bg-card/60 overflow-hidden">
      <div className="flex items-center">
        <div className="bg-primary text-primary-foreground px-3 py-1.5 cell font-bold flex-shrink-0 self-stretch flex items-center">
          LIVE TAPE
        </div>
        <div className="overflow-hidden flex-1 py-1.5">
          <div className="ticker-marquee inline-flex gap-6 whitespace-nowrap">
            {looped.map((r, i) => (
              <span key={i} className="cell flex items-center gap-2">
                <span className="text-muted-foreground">{fmtDate(r.date)}</span>
                <span className="text-[hsl(var(--accent))]">
                  {CATEGORY_SHORT[r.category]}
                </span>
                <span className="font-semibold">{r.company_name.toUpperCase()}</span>
                <span className="text-primary">
                  +{r.round_size}
                </span>
                <span className="text-muted-foreground">{r.stage}</span>
                <span className="text-muted-foreground">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
