import { useState, type ReactNode } from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GLOSSARY } from "@/lib/dealflow-utils";

// Wraps a piece of text with a definition tooltip.
// If term has a definition in GLOSSARY, show a subtle dotted underline + tooltip.
export function Define({ term, children }: { term?: string; children: ReactNode }) {
  const key = term || (typeof children === "string" ? (children as string) : "");
  const def = GLOSSARY[key];
  if (!def) return <>{children}</>;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className="border-b border-dotted border-muted-foreground/60 cursor-help"
          data-testid={`text-define-${key.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-xs leading-relaxed">
        <div className="font-semibold mb-1 text-primary">{key}</div>
        <div className="text-muted-foreground">{def}</div>
      </TooltipContent>
    </Tooltip>
  );
}

// A standalone "?" icon that explains the meaning of a section title.
export function Helper({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="What does this mean?"
          data-testid="button-helper"
        >
          <HelpCircle className="size-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-xs leading-relaxed">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

// Full glossary panel — bottom-of-page reference.
export function GlossaryPanel() {
  const [open, setOpen] = useState(false);
  const entries = Object.entries(GLOSSARY);
  return (
    <div className="border border-card-border rounded-md bg-card/40">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover-elevate"
        data-testid="button-toggle-glossary"
      >
        <div className="flex items-center gap-2">
          <span className="cell text-primary">[ ? ]</span>
          <span className="text-sm font-medium">Plain-Language Glossary</span>
          <span className="cell text-muted-foreground">{entries.length} terms</span>
        </div>
        <span className="cell text-muted-foreground">{open ? "[ - ] HIDE" : "[ + ] SHOW"}</span>
      </button>
      {open && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border-t border-card-border">
          {entries.map(([term, def]) => (
            <div key={term} className="text-xs">
              <div className="font-semibold text-foreground">{term}</div>
              <div className="text-muted-foreground mt-0.5">{def}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
