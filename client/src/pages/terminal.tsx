import { TerminalHeader } from "@/components/TerminalHeader";
import { Ticker } from "@/components/Ticker";
import { CategoryStrip } from "@/components/CategoryStrip";
import { HeatMap } from "@/components/HeatMap";
import { RoundsModule } from "@/components/RoundsModule";
import { FoundersModule } from "@/components/FoundersModule";
import { TractionModule } from "@/components/TractionModule";
import { EventsModule } from "@/components/EventsModule";
import { SocialModule } from "@/components/SocialModule";
import { WhiteSpaceModule } from "@/components/WhiteSpaceModule";
import { SideNav } from "@/components/SideNav";
import { GlossaryPanel } from "@/components/Glossary";
import { dealflowData } from "@/data/dealflow";

export default function Terminal() {
  const totalSignals =
    dealflowData.rounds.length +
    dealflowData.founders.length +
    dealflowData.traction.length +
    dealflowData.events.length +
    dealflowData.social.length +
    dealflowData.whitespace.length;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <TerminalHeader totalSignals={totalSignals} asOfDate="MAY 20 2026" />
      <Ticker />

      <div className="flex-1 flex overflow-hidden">
        <SideNav />

        <main className="flex-1 overflow-y-auto" id="overview">
          {/* Overview */}
          <CategoryStrip />
          <div className="px-4 md:px-6 pb-4">
            <HeatMap />
          </div>

          {/* Mantra strip */}
          <div className="px-4 md:px-6 pb-6">
            <div className="border border-dashed border-primary/40 rounded-md p-4 bg-primary/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <div className="cell text-primary mb-1">› HOW TO USE THIS DASHBOARD</div>
                  <p className="text-sm text-foreground/90 leading-relaxed max-w-3xl">
                    Scan the heatmap at the top to see where capital and attention are concentrating right now.
                    Then drop into each module below. <span className="text-primary font-semibold">Hot rounds (red)</span> are the most recent + biggest deals
                    with notable investors. <span className="font-semibold">Buzz, Traction, and Gaps</span> are where you find founders before anyone else.
                    <span className="text-[hsl(var(--accent))] font-semibold"> Events</span> are how you actually meet them.
                  </p>
                </div>
                <div className="flex-shrink-0 cell text-muted-foreground self-start md:self-center">
                  <div>WEEKLY REFRESH RECOMMENDED</div>
                  <div className="text-right text-foreground/70">Re-run scanner each Monday</div>
                </div>
              </div>
            </div>
          </div>

          {/* Modules — stacked, each anchored */}
          <div className="px-4 md:px-6 pb-6 space-y-6">
            <RoundsModule />
            <FoundersModule />
            <TractionModule />
            <EventsModule />
            <WhiteSpaceModule />
            <SocialModule />
            <GlossaryPanel />
          </div>

          {/* Footer */}
          <footer className="px-4 md:px-6 py-6 border-t border-card-border text-center">
            <div className="cell text-muted-foreground">
              DEAL FLOW TERMINAL · BUILT FOR CAM · {totalSignals} SIGNALS · AS-OF MAY 20 2026
            </div>
            <div className="cell text-muted-foreground/60 mt-1">
              SOURCES: CRUNCHBASE · TECHCRUNCH · AXIOS · PRODUCT HUNT · HACKER NEWS · LUMA · EVENTBRITE · X · REDDIT · LINKEDIN · YC RFS · BVP · BIOLM · A16Z
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
