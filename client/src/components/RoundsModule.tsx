import { useState } from "react";
import { dealflowData } from "@/data/dealflow";
import { ModuleShell, CategoryBadge } from "./ModuleShell";
import { Define } from "./Glossary";
import {
  fmtDate,
  daysAgo,
  heatScore,
  heatColor,
  parseRound,
} from "@/lib/dealflow-utils";
import { ExternalLink, Flame } from "lucide-react";

const ALL_CATS = ["All", "PRO", "AIB", "DTP"] as const;

const CAT_MAP: Record<string, string> = {
  PRO: "Business/Professional Services",
  AIB: "AI and Biotech",
  DTP: "Deep Tech Platforms",
};

export function RoundsModule() {
  const [filter, setFilter] = useState<(typeof ALL_CATS)[number]>("All");
  const [sortBy, setSortBy] = useState<"heat" | "date" | "size">("heat");

  let rows = [...dealflowData.rounds];
  if (filter !== "All") rows = rows.filter((r) => r.category === CAT_MAP[filter]);
  rows.sort((a, b) => {
    if (sortBy === "date") return daysAgo(a.date) - daysAgo(b.date);
    if (sortBy === "size") return parseRound(b.round_size) - parseRound(a.round_size);
    return heatScore(b) - heatScore(a);
  });

  return (
    <ModuleShell
      id="rounds"
      code="RND"
      title="Recent Rounds"
      subtitle="Seed & pre-seed closings · last 90 days"
      helper="Every funded deal in your three focus areas that closed in the last 90 days. 'Heat' combines round size, how recent it is, and how notable the lead investor is."
      count={rows.length}
      toolbar={
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-0.5 rounded border border-card-border p-0.5">
            {ALL_CATS.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`cell px-2 py-0.5 rounded transition-colors ${
                  filter === c
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover-elevate"
                }`}
                data-testid={`button-filter-${c.toLowerCase()}`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as never)}
            className="cell bg-background border border-card-border rounded px-2 py-0.5"
            data-testid="select-sort-rounds"
          >
            <option value="heat">SORT: HEAT</option>
            <option value="date">SORT: DATE</option>
            <option value="size">SORT: $ SIZE</option>
          </select>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="cell text-muted-foreground border-b border-card-border bg-card/40">
              <th className="text-left px-3 py-2 font-medium">HEAT</th>
              <th className="text-left px-3 py-2 font-medium">DATE</th>
              <th className="text-left px-3 py-2 font-medium">CAT</th>
              <th className="text-left px-3 py-2 font-medium">COMPANY</th>
              <th className="text-left px-3 py-2 font-medium">STAGE</th>
              <th className="text-right px-3 py-2 font-medium">SIZE</th>
              <th className="text-left px-3 py-2 font-medium">LEAD</th>
              <th className="text-left px-3 py-2 font-medium hidden lg:table-cell">WHAT THEY DO</th>
              <th className="px-2 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const score = heatScore(r);
              const age = daysAgo(r.date);
              return (
                <tr
                  key={i}
                  className="border-b border-card-border/50 hover-elevate"
                  data-testid={`row-round-${i}`}
                >
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <Flame className="size-3" style={{ color: heatColor(score) }} />
                      <span
                        className="num text-xs font-semibold"
                        style={{ color: heatColor(score) }}
                      >
                        {score}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="cell">{fmtDate(r.date)}</div>
                    <div className="cell text-muted-foreground">
                      {age <= 7 ? `${age}D AGO` : age <= 30 ? `${Math.floor(age / 7)}W AGO` : `${Math.floor(age / 30)}MO AGO`}
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <CategoryBadge category={r.category} />
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="font-semibold text-sm">{r.company_name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                      {r.founders.split("—")[0]}
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <Define term={r.stage.includes("Pre") ? "Pre-Seed" : "Seed"}>
                      <span className="cell">{r.stage.toUpperCase()}</span>
                    </Define>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="num font-semibold">{r.round_size}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <Define term="Lead investor">
                      <span className="text-xs">{r.lead_investor}</span>
                    </Define>
                  </td>
                  <td className="px-3 py-2.5 hidden lg:table-cell max-w-md">
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {r.description_plain}
                    </div>
                    <div className="text-xs mt-0.5 text-foreground/80 italic line-clamp-1">
                      → {r.why_it_matters}
                    </div>
                  </td>
                  <td className="px-2 py-2.5">
                    <a
                      href={r.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                      title={r.source_name}
                      data-testid={`link-source-${i}`}
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ModuleShell>
  );
}
