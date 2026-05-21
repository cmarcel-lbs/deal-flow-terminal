import { useMemo } from "react";
import { dealflowData } from "@/data/dealflow";
import { parseRound, daysAgo, heatScore, heatColor, CATEGORY_HUE_VAR } from "@/lib/dealflow-utils";
import { Helper } from "./Glossary";

const CATEGORIES = [
  "Business/Professional Services",
  "AI and Biotech",
  "Deep Tech Platforms",
] as const;

// 90 days of weekly buckets, 3 category rows.
// Cell = sum of heat scores for rounds in that week+category.
export function HeatMap() {
  const grid = useMemo(() => buildGrid(), []);
  return (
    <section className="border border-card-border rounded-md bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight flex items-center gap-1.5">
            90-Day Funding Heatmap
            <Helper text="Each cell shows how much funding activity hit each category each week. Hotter cells = bigger rounds, more notable investors, more recent." />
          </h3>
          <div className="cell text-muted-foreground mt-0.5">
            ROW = CATEGORY · COL = WEEK · COLOR = HEAT
          </div>
        </div>
        <Legend />
      </div>

      <div className="w-full">
        {/* Header row: week numbers */}
        <div className="flex items-center mb-1">
          <div className="flex-shrink-0" style={{ width: "200px" }} />
          <div className="flex-1 grid gap-0.5" style={{ gridTemplateColumns: `repeat(${grid.weeks.length}, minmax(0, 1fr))` }}>
            {grid.weeks.map((wk, i) => (
              <div key={i} className="text-center cell text-muted-foreground py-1" title={wk.label}>
                W{wk.weekNum}
              </div>
            ))}
          </div>
        </div>

        {/* Data rows */}
        {CATEGORIES.map((cat) => {
          const hue = `hsl(var(${CATEGORY_HUE_VAR[cat]}))`;
          const row = grid.rows[cat];
          return (
            <div key={cat} className="flex items-center mb-1">
              <div className="flex-shrink-0 flex items-center gap-1.5 pr-3" style={{ width: "200px" }}>
                <span className="signal-dot flex-shrink-0" style={{ background: hue, color: hue }} />
                <span className="text-xs font-medium truncate" title={cat}>{cat}</span>
              </div>
              <div className="flex-1 grid gap-0.5" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
                {row.map((cell, i) => (
                  <div
                    key={i}
                    className="h-7 rounded-sm cursor-help"
                    style={{
                      background: cell.score > 0 ? heatColor(cell.score) : "hsl(var(--muted) / 0.4)",
                      opacity: cell.score > 0 ? 0.85 : 0.3,
                    }}
                    title={
                      cell.count > 0
                        ? `Week of ${grid.weeks[i].label}: ${cell.count} round${cell.count > 1 ? "s" : ""} · $${cell.capital.toFixed(1)}M · heat ${cell.score}`
                        : `Week of ${grid.weeks[i].label}: no rounds`
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Footer row: month labels (deduped) */}
        <div className="flex items-center mt-1">
          <div className="flex-shrink-0" style={{ width: "200px" }} />
          <div className="flex-1 grid gap-0.5" style={{ gridTemplateColumns: `repeat(${grid.weeks.length}, minmax(0, 1fr))` }}>
            {grid.weeks.map((wk, i) => {
              const showMonth = i === 0 || grid.weeks[i].monthLabel !== grid.weeks[i - 1].monthLabel;
              return (
                <div key={i} className="text-center cell text-muted-foreground/70">
                  {showMonth ? wk.monthLabel : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Legend() {
  const stops = [10, 30, 50, 70, 90];
  return (
    <div className="flex items-center gap-2">
      <span className="cell text-muted-foreground">COLD</span>
      <div className="flex gap-0.5">
        {stops.map((s) => (
          <div
            key={s}
            className="w-4 h-3 rounded-sm"
            style={{ background: heatColor(s) }}
          />
        ))}
      </div>
      <span className="cell text-muted-foreground">HOT</span>
    </div>
  );
}

function buildGrid() {
  const NUM_WEEKS = 13;
  const today = new Date("2026-05-20");
  const weeks = Array.from({ length: NUM_WEEKS }).map((_, i) => {
    const offset = NUM_WEEKS - 1 - i;
    const d = new Date(today);
    d.setDate(d.getDate() - offset * 7);
    return {
      start: d,
      label: d.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
      shortLabel: d.toLocaleDateString("en-US", { month: "short" }).slice(0, 3),
      monthLabel: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      weekNum: NUM_WEEKS - offset,
    };
  });

  const rows: Record<string, Array<{ count: number; capital: number; score: number }>> = {};
  CATEGORIES.forEach((cat) => {
    rows[cat] = weeks.map(() => ({ count: 0, capital: 0, score: 0 }));
  });

  dealflowData.rounds.forEach((r) => {
    const age = daysAgo(r.date);
    if (age > 90) return;
    const weekIdx = NUM_WEEKS - 1 - Math.floor(age / 7);
    if (weekIdx < 0 || weekIdx >= NUM_WEEKS) return;
    const row = rows[r.category];
    if (!row) return;
    row[weekIdx].count += 1;
    row[weekIdx].capital += parseRound(r.round_size);
    row[weekIdx].score = Math.max(row[weekIdx].score, heatScore(r));
  });

  return { weeks, rows };
}
