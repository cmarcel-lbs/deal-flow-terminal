// Shared helpers for the deal flow terminal.

export type Category =
  | "Business/Professional Services"
  | "AI and Biotech"
  | "Deep Tech Platforms";

export const CATEGORY_LABEL: Record<string, string> = {
  "Business/Professional Services": "Pro Services",
  "AI and Biotech": "AI & Bio",
  "Deep Tech Platforms": "Deep Tech",
};

export const CATEGORY_SHORT: Record<string, string> = {
  "Business/Professional Services": "PRO",
  "AI and Biotech": "AIB",
  "Deep Tech Platforms": "DTP",
};

export const CATEGORY_HUE: Record<string, string> = {
  "Business/Professional Services": "hsl(var(--cat-pro))",
  "AI and Biotech": "hsl(var(--cat-ai))",
  "Deep Tech Platforms": "hsl(var(--cat-deep))",
};

export const CATEGORY_HUE_VAR: Record<string, string> = {
  "Business/Professional Services": "--cat-pro",
  "AI and Biotech": "--cat-ai",
  "Deep Tech Platforms": "--cat-deep",
};

// Parse round string to USD millions number (best-effort)
export function parseRound(round: string): number {
  if (!round) return 0;
  const m = round.match(/([\d.,]+)\s*([MK]?)/i);
  if (!m) return 0;
  const val = parseFloat(m[1].replace(/,/g, ""));
  const unit = (m[2] || "").toUpperCase();
  if (unit === "K") return val / 1000;
  return val;
}

export function fmtDate(d: string): string {
  // Accept YYYY-MM-DD or already-formatted strings.
  if (!d) return "—";
  if (d.startsWith("~")) return d.replace("~", "").toUpperCase();
  const parsed = new Date(d);
  if (isNaN(parsed.getTime())) return d.toUpperCase();
  return parsed
    .toLocaleDateString("en-US", { month: "short", day: "2-digit" })
    .toUpperCase();
}

export function daysAgo(d: string): number {
  if (!d) return 999;
  if (d.startsWith("~")) {
    // Rough estimate for fuzzy dates like "~Mar"
    const monthName = d.replace("~", "").trim();
    const months: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    if (monthName in months) {
      const today = new Date("2026-05-20");
      const guess = new Date(2026, months[monthName], 15);
      return Math.max(0, Math.floor((today.getTime() - guess.getTime()) / 86400000));
    }
    return 60;
  }
  const parsed = new Date(d);
  if (isNaN(parsed.getTime())) return 60;
  const today = new Date("2026-05-20");
  return Math.max(0, Math.floor((today.getTime() - parsed.getTime()) / 86400000));
}

// Heat score (0-100) — used for the heatmap. Combines recency + round size + lead notability.
const TOP_TIER = new Set([
  "andreessen horowitz", "a16z", "sequoia", "founders fund", "khosla ventures",
  "khosla", "benchmark", "lightspeed", "kleiner perkins", "accel",
  "bessemer", "general catalyst", "index ventures", "thrive capital",
  "first round", "nfx", "initialized", "spark capital", "greylock",
]);

export function heatScore(round: {
  date: string;
  round_size: string;
  lead_investor?: string;
  stage?: string;
}): number {
  const ageDays = daysAgo(round.date);
  const recency = Math.max(0, 1 - ageDays / 90); // 1.0 = today, 0 = 90 days old
  const size = Math.min(1, parseRound(round.round_size) / 25); // cap at $25M
  const lead = (round.lead_investor || "").toLowerCase();
  const notable = [...TOP_TIER].some((t) => lead.includes(t)) ? 1 : 0.4;
  const stageBoost = (round.stage || "").toLowerCase().includes("pre") ? 0.15 : 0;
  return Math.min(
    100,
    Math.round((recency * 0.45 + size * 0.3 + notable * 0.2 + stageBoost) * 100)
  );
}

export function heatColor(score: number): string {
  if (score >= 75) return "hsl(0 70% 55%)";       // hot red
  if (score >= 55) return "hsl(38 95% 55%)";      // amber
  if (score >= 35) return "hsl(60 70% 50%)";      // yellow
  if (score >= 15) return "hsl(178 60% 45%)";     // cyan
  return "hsl(220 30% 35%)";                       // cool blue
}

export function platformColor(p: string): string {
  const lower = (p || "").toLowerCase();
  if (lower.includes("x") || lower.includes("twitter")) return "hsl(var(--foreground))";
  if (lower.includes("reddit")) return "hsl(15 85% 55%)";
  if (lower.includes("linkedin")) return "hsl(207 80% 50%)";
  return "hsl(var(--muted-foreground))";
}

// Plain-language jargon glossary — first-gen-founder-friendly
export const GLOSSARY: Record<string, string> = {
  "Pre-Seed":
    "The earliest round of investor money — usually $500K–$3M. Often comes from angels, accelerators, or a friend-and-family round.",
  "Seed":
    "The first 'real' round of venture money — typically $1M–$10M. Pays for a starting team and the first version of a product.",
  "Series A":
    "The first big institutional round — typically $5M–$30M. The company is showing real traction and is hiring fast.",
  "Lead investor":
    "The fund or person who writes the biggest check and 'sets the terms' for the round. Other investors follow their lead.",
  "ARR":
    "Annual Recurring Revenue — what a subscription business would earn in a year if every current customer stayed.",
  "MRR":
    "Monthly Recurring Revenue — same as ARR, but per month.",
  "Bootstrapped":
    "Built with no outside investors. The founder funded it themselves or grew it on customer revenue.",
  "Institutional VC":
    "A real venture fund (not a friend or angel). They write large checks and expect a big return.",
  "TAM":
    "Total Addressable Market — the maximum revenue a startup could ever earn if it captured 100% of demand.",
  "RFS":
    "Request for Startups — when a VC publishes a list of ideas they want founders to build.",
  "Y Combinator (YC)":
    "The most famous startup accelerator. Twice a year they fund ~250 companies for ~3 months.",
  "Demo Day":
    "An event where startups from an accelerator pitch to investors all at once.",
  "Build in Public":
    "A trend where founders share their progress (revenue, users, mistakes) openly on X/Twitter.",
  "White Space":
    "A gap in the market — a real problem with no good, well-funded solution yet.",
  "Wedge":
    "A specific, narrow first product a startup uses to break into a bigger market.",
  "Show HN":
    "A category on Hacker News where developers post things they built. Top posts get major exposure.",
  "Product Hunt":
    "A site where new products launch each day. Ranking #1 brings traffic and credibility.",
};
