import { dealflowData } from "@/data/dealflow";
import {
  parseRound,
  CATEGORY_HUE_VAR,
} from "@/lib/dealflow-utils";
import { Helper } from "./Glossary";

const CATEGORIES = [
  "Business/Professional Services",
  "AI and Biotech",
  "Deep Tech Platforms",
] as const;

export function CategoryStrip() {
  // Compute per-category aggregates
  const stats = CATEGORIES.map((cat) => {
    const rounds = dealflowData.rounds.filter((r) => r.category === cat);
    const founders = dealflowData.founders.filter((r) => r.category === cat);
    const traction = dealflowData.traction.filter((r) => r.category === cat);
    const social = dealflowData.social.filter((r) => r.category === cat);
    const whitespace = dealflowData.whitespace.filter((r) => r.category === cat);
    const totalCapital = rounds.reduce(
      (sum, r) => sum + parseRound(r.round_size),
      0
    );
    const totalSignals =
      rounds.length +
      founders.length +
      traction.length +
      social.length +
      whitespace.length;
    return {
      cat,
      rounds: rounds.length,
      founders: founders.length,
      traction: traction.length,
      social: social.length,
      whitespace: whitespace.length,
      totalCapital,
      totalSignals,
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-4 md:px-6 py-4">
      {stats.map((s) => {
        const hueVar = CATEGORY_HUE_VAR[s.cat];
        return (
          <div
            key={s.cat}
            className="border border-card-border rounded-md bg-card relative overflow-hidden hover-elevate transition-all"
            data-testid={`card-category-${s.cat.replace(/[^a-z]/gi, "")}`}
            style={{ borderLeftWidth: 4, borderLeftColor: `hsl(var(${hueVar}))` }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="cell text-muted-foreground mb-1">CATEGORY</div>
                  <div className="text-base font-semibold tracking-tight">{s.cat}</div>
                </div>
                <div className="text-right">
                  <div className="cell text-muted-foreground">SIGNALS</div>
                  <div
                    className="num text-xl font-bold"
                    style={{ color: `hsl(var(${hueVar}))` }}
                  >
                    {s.totalSignals}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-1.5 text-center">
                <Metric label="ROUNDS" value={s.rounds} hint="Funded deals in the last 90 days." />
                <Metric label="BUZZ" value={s.founders} hint="Founders gaining attention without big VC backing." />
                <Metric label="TRACT" value={s.traction} hint="Products winning users on their own — no funding." />
                <Metric label="CHAT" value={s.social} hint="High-signal social posts in this space." />
                <Metric label="GAPS" value={s.whitespace} hint="White-space opportunities — clear demand, no funded fix." />
              </div>

              <div className="mt-3 pt-3 border-t border-card-border flex items-baseline justify-between">
                <span className="cell text-muted-foreground">CAPITAL DEPLOYED (90D)</span>
                <span className="num font-semibold">
                  ${s.totalCapital.toFixed(1)}M
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Metric({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div>
      <div className="num text-base font-semibold">{value}</div>
      <div className="flex items-center justify-center gap-0.5 cell text-muted-foreground">
        <span>{label}</span>
        <Helper text={hint} />
      </div>
    </div>
  );
}
