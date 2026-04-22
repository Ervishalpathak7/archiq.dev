import { Handle, Position, type NodeProps } from "reactflow";
import {
  Server,
  Database,
  Cloud,
  Box,
  Layers,
  Network,
  Zap,
  Lock,
  HardDrive,
  Cpu,
  Globe,
  Workflow,
} from "lucide-react";
import type { ArchNodeKind } from "@/lib/architectures";
import { cn } from "@/lib/utils";

export type ArchNodeData = {
  kind: ArchNodeKind;
  label: string;
  sublabel?: string;
  ghost?: boolean;
};

const kindMeta: Record<
  ArchNodeKind,
  { icon: React.ComponentType<{ className?: string }>; tone: string }
> = {
  client: { icon: Globe, tone: "text-sky-400 border-sky-400/30 bg-sky-400/5" },
  gateway: {
    icon: Network,
    tone: "text-violet-400 border-violet-400/30 bg-violet-400/5",
  },
  service: {
    icon: Server,
    tone: "text-primary border-primary/30 bg-primary/5",
  },
  database: {
    icon: Database,
    tone: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  },
  cache: { icon: Zap, tone: "text-rose-400 border-rose-400/30 bg-rose-400/5" },
  queue: {
    icon: Workflow,
    tone: "text-orange-400 border-orange-400/30 bg-orange-400/5",
  },
  storage: {
    icon: HardDrive,
    tone: "text-teal-400 border-teal-400/30 bg-teal-400/5",
  },
  ai: {
    icon: Cpu,
    tone: "text-fuchsia-400 border-fuchsia-400/30 bg-fuchsia-400/5",
  },
  external: {
    icon: Box,
    tone: "text-amber-400 border-amber-400/30 bg-amber-400/5",
  },
  auth: {
    icon: Lock,
    tone: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
  },
  cdn: { icon: Cloud, tone: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5" },
};

export function ArchNodeView({ data }: NodeProps<ArchNodeData>) {
  const { icon: Icon, tone } = kindMeta[data.kind] ?? {
    icon: Layers,
    tone: "",
  };

  if (data.ghost) {
    return (
      <div className="shimmer h-16 w-45 rounded-xl border border-border" />
    );
  }

  return (
    <div
      className={cn(
        "group min-w-45 rounded-xl border bg-card/95 px-3 py-2.5 shadow-lg shadow-black/20 backdrop-blur transition-shadow hover:shadow-xl",
        tone,
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="h-2! !w-2 border-0! !bg-muted-foreground"
      />
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-md border",
            tone,
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-foreground">
            {data.label}
          </p>
          {data.sublabel && (
            <p className="truncate font-mono text-[10px] text-muted-foreground">
              {data.sublabel}
            </p>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="h-2! w-2! border-0! bg-muted-foreground!"
      />
    </div>
  );
}
