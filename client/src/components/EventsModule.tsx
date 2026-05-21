import { dealflowData } from "@/data/dealflow";
import { ModuleShell, CategoryBadge } from "./ModuleShell";
import { ExternalLink, MapPin, Calendar, DollarSign } from "lucide-react";
import { fmtDate, daysAgo } from "@/lib/dealflow-utils";

export function EventsModule() {
  const rows = [...dealflowData.events].sort((a, b) =>
    a.date < b.date ? -1 : 1
  );
  // Bucket by week
  const today = new Date("2026-05-20");
  function weekBucket(d: string) {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return "Later";
    const days = Math.floor((dt.getTime() - today.getTime()) / 86400000);
    if (days < 0) return "This week";
    if (days < 7) return "This week";
    if (days < 14) return "Next week";
    if (days < 28) return "In 2-4 weeks";
    return "Later this quarter";
  }
  const buckets: Record<string, typeof rows> = {};
  rows.forEach((r) => {
    const b = weekBucket(r.date);
    if (!buckets[b]) buckets[b] = [];
    buckets[b].push(r);
  });
  const order = ["This week", "Next week", "In 2-4 weeks", "Later this quarter"];

  return (
    <ModuleShell
      id="events"
      code="EVT"
      title="NYC Events"
      subtitle="Where to meet founders in person · next 60 days"
      helper="Demo days, founder meetups, and pitch nights in and around NYC. The fastest way to find pre-funded founders is to show up where they're already gathering."
      count={rows.length}
    >
      <div className="p-3 space-y-3">
        {order.map((bucket) =>
          buckets[bucket] && buckets[bucket].length > 0 ? (
            <div key={bucket}>
              <div className="flex items-center gap-2 mb-2">
                <span className="cell text-primary font-semibold">› {bucket.toUpperCase()}</span>
                <span className="cell text-muted-foreground">
                  {buckets[bucket].length} events
                </span>
                <div className="flex-1 h-px bg-card-border" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {buckets[bucket].map((e, i) => {
                  const age = daysAgo(e.date);
                  const isToday = age === 0;
                  const isSoon = age <= -1 && age >= -3;
                  return (
                    <article
                      key={i}
                      className="border border-card-border rounded-md p-3 bg-card/40 hover-elevate flex flex-col gap-2"
                      data-testid={`card-event-${i}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="size-3 text-[hsl(var(--accent))]" />
                            <span className="cell font-semibold">
                              {fmtDate(e.date)}
                            </span>
                            {e.time && (
                              <span className="cell text-muted-foreground">
                                {e.time}
                              </span>
                            )}
                          </div>
                          <div className="font-semibold text-sm mt-1 leading-tight">
                            {e.event_name}
                          </div>
                        </div>
                        <CategoryBadge category={e.category === "all" ? "Business/Professional Services" : e.category} />
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {e.description_plain}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-1">
                        {e.venue && (
                          <span className="flex items-center gap-1 truncate max-w-[160px]">
                            <MapPin className="size-3 flex-shrink-0" />
                            <span className="truncate">{e.neighborhood || e.venue}</span>
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <DollarSign className="size-3" />
                          <span className="cell">{(e.cost || "TBD").toUpperCase()}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-card-border/60 pt-2">
                        <div>
                          {(isToday || isSoon) && (
                            <span className="cell px-1.5 py-0.5 rounded bg-[hsl(var(--signal-up)/0.15)] text-[hsl(var(--signal-up))]">
                              ● HAPPENING NOW
                            </span>
                          )}
                        </div>
                        {e.registration_url && (
                          <a
                            href={e.registration_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cell text-[hsl(var(--accent))] hover:underline flex items-center gap-1"
                            data-testid={`link-register-${i}`}
                          >
                            REGISTER <ExternalLink className="size-3" />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : null
        )}
      </div>
    </ModuleShell>
  );
}
