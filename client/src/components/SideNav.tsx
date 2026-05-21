import {
  TrendingUp,
  Rocket,
  Zap,
  Calendar,
  MessageSquare,
  Target,
  LayoutGrid,
} from "lucide-react";

const items = [
  { id: "overview", label: "Overview", code: "OVW", icon: LayoutGrid },
  { id: "rounds", label: "Recent Rounds", code: "RND", icon: TrendingUp },
  { id: "founders", label: "Rising Founders", code: "BUZ", icon: Rocket },
  { id: "traction", label: "Organic Traction", code: "TRC", icon: Zap },
  { id: "events", label: "NYC Events", code: "EVT", icon: Calendar },
  { id: "social", label: "Social Chatter", code: "CHT", icon: MessageSquare },
  { id: "whitespace", label: "White Space", code: "GAP", icon: Target },
];

export function SideNav() {
  return (
    <nav className="hidden lg:flex flex-col w-44 flex-shrink-0 border-r border-card-border bg-sidebar p-2 gap-1">
      <div className="px-2 py-2 cell text-muted-foreground">› MODULES</div>
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md hover-elevate text-sm"
            data-testid={`link-nav-${it.id}`}
          >
            <Icon className="size-3.5 text-muted-foreground" />
            <span className="flex-1">{it.label}</span>
            <span className="cell text-muted-foreground">{it.code}</span>
          </a>
        );
      })}
      <div className="mt-auto px-2 py-2 cell text-muted-foreground border-t border-card-border pt-3">
        <div>BUILT FOR FIRST-GEN FOUNDERS</div>
        <div className="text-foreground/60 mt-1">Hover any dotted term for a plain-language definition.</div>
      </div>
    </nav>
  );
}
