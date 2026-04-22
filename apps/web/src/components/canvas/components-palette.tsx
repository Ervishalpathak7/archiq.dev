import { COMPONENT_CATALOG, type ArchNodeKind } from "@/lib/architectures";
import { Server, Database, Cloud, Box, Network, Zap, HardDrive, Cpu, Globe, Lock, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const iconFor: Record<ArchNodeKind, React.ComponentType<{ className?: string }>> = {
  client: Globe,
  gateway: Network,
  service: Server,
  database: Database,
  cache: Zap,
  queue: Workflow,
  storage: HardDrive,
  ai: Cpu,
  external: Box,
  auth: Lock,
  cdn: Cloud,
};

export function ComponentsPalette({
  onAdd,
  className,
}: {
  onAdd: (kind: ArchNodeKind, label: string, sublabel?: string) => void;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "flex h-full w-72 flex-col border-l border-border bg-sidebar",
        className,
      )}
    >
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold">Components</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">Click to add to the canvas</p>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {COMPONENT_CATALOG.map((cat) => (
          <div key={cat.category} className="mb-5">
            <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {cat.category}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {cat.items.map((item) => {
                const Icon = iconFor[item.kind];
                return (
                  <button
                    key={`${cat.category}-${item.label}`}
                    onClick={() => onAdd(item.kind, item.label, item.sublabel)}
                    className="group flex flex-col items-start gap-1.5 rounded-lg border border-border bg-card/60 p-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-md"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="line-clamp-1 text-xs font-medium text-foreground">
                      {item.label}
                    </span>
                    {item.sublabel && (
                      <span className="line-clamp-1 font-mono text-[10px] text-muted-foreground">
                        {item.sublabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
