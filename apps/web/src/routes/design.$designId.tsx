import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  type Edge,
  type Node,
  type NodeTypes,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  addEdge,
  type Connection,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  ArrowLeft,
  Download,
  RefreshCw,
  Share2,
  Send,
  PanelRightClose,
  PanelRightOpen,
  Loader2,
} from "lucide-react";
import { Logo, ProfileMenu } from "@/components/header-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArchNodeView, type ArchNodeData } from "@/components/canvas/arch-node";
import { ComponentsPalette } from "@/components/canvas/components-palette";
import {
  pickArchitecture,
  type ArchNodeKind,
  type Architecture,
} from "@/lib/architectures";
import { getDesign, saveDesign, type DesignSummary } from "@/lib/designs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/design/$designId")({
  head: ({ params }) => ({
    meta: [
      { title: `Design ${params.designId} — Stitch` },
      {
        name: "description",
        content:
          "AI-generated system architecture diagram on the Stitch canvas.",
      },
    ],
  }),
  component: DesignPage,
});

const nodeTypes: NodeTypes = { arch: ArchNodeView };

function archToFlow(
  arch: Architecture,
  ghost = false,
): { nodes: Node<ArchNodeData>[]; edges: Edge[] } {
  return {
    nodes: arch.nodes.map((n) => ({
      id: n.id,
      type: "arch",
      position: n.position,
      data: { kind: n.kind, label: n.label, sublabel: n.sublabel, ghost },
    })),
    edges: ghost
      ? []
      : arch.edges.map((e) => ({
          id: e.id,
          source: e.sourceId,
          target: e.targetId,
          label: e.label,
          animated: e.animated,
          type: "smoothstep",
          markerEnd: { type: MarkerType.ArrowClosed },
          labelStyle: { fontSize: 10, fontFamily: "JetBrains Mono, monospace" },
          labelBgStyle: { fill: "var(--card)" },
        })),
  };
}

function DesignPage() {
  return (
    <ReactFlowProvider>
      <DesignInner />
    </ReactFlowProvider>
  );
}

function DesignInner() {
  const { designId } = Route.useParams();
  const [design, setDesign] = useState<DesignSummary | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(true);
  const [stage, setStage] = useState<
    "idle" | "ghost" | "labels" | "edges" | "done"
  >("idle");
  const [followUp, setFollowUp] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState<ArchNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const generationToken = useRef(0);

  // Load design from storage (or create stub for guest navigations)
  useEffect(() => {
    let d = getDesign(designId);
    if (!d) {
      d = {
        id: designId,
        title: "Untitled design",
        prompt: "Generic web application",
        createdAt: Date.now(),
      };
      saveDesign(d);
    }
    setDesign(d);
    setTitle(d.title);
    runGeneration(d.prompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designId]);

  function runGeneration(prompt: string) {
    const token = ++generationToken.current;
    const arch = pickArchitecture(prompt);
    const ghost = archToFlow(arch, true);
    const real = archToFlow(arch, false);

    setStage("ghost");
    setNodes(ghost.nodes);
    setEdges([]);

    // Stage 1: ghost shimmer (1.2s)
    setTimeout(() => {
      if (token !== generationToken.current) return;
      setStage("labels");
      setNodes(real.nodes);
    }, 1200);

    // Stage 2: edges fade in (after 2.4s total)
    setTimeout(() => {
      if (token !== generationToken.current) return;
      setStage("edges");
      setEdges(real.edges);
    }, 2400);

    // Stage 3: done (after 3.4s total)
    setTimeout(() => {
      if (token !== generationToken.current) return;
      setStage("done");
    }, 3400);
  }

  function regenerate() {
    if (!design) return;
    toast.info("Regenerating diagram...");
    runGeneration(design.prompt);
  }

  function applyFollowUp(e: React.FormEvent) {
    e.preventDefault();
    if (!followUp.trim() || !design) return;
    const merged = `${design.prompt}\n${followUp}`;
    const updated = { ...design, prompt: merged };
    saveDesign(updated);
    setDesign(updated);
    setFollowUp("");
    toast.success("Refining diagram...");
    runGeneration(merged);
  }

  function commitTitle() {
    if (!design) return;
    const next = title.trim() || "Untitled design";
    const updated = { ...design, title: next };
    saveDesign(updated);
    setDesign(updated);
  }

  const onConnect = (connection: Connection) =>
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          type: "smoothstep",
          markerEnd: { type: MarkerType.ArrowClosed },
        },
        eds,
      ),
    );

  function addComponent(kind: ArchNodeKind, label: string, sublabel?: string) {
    const id = `${kind}-${crypto.randomUUID().slice(0, 6)}`;
    const offsetX = 120 + (nodes.length % 5) * 60;
    const offsetY = 120 + Math.floor(nodes.length / 5) * 40;
    const newNode: Node<ArchNodeData> = {
      id,
      type: "arch",
      position: { x: offsetX, y: offsetY },
      data: { kind, label, sublabel },
    };
    setNodes((n) => [...n, newNode]);
    toast.success(`Added ${label}`);
  }

  const isGenerating = stage !== "done";
  const proxyKey = useMemo(() => `${designId}-${stage}`, [designId, stage]);

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Top bar */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 py-2.5 backdrop-blur">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Logo />
          <span className="hidden text-muted-foreground sm:inline">/</span>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={commitTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
            className="h-8 max-w-xs border-transparent bg-transparent px-1 text-sm font-medium hover:border-border focus-visible:border-border"
          />
          {isGenerating && (
            <span className="ml-2 hidden items-center gap-1.5 font-mono text-[10px] uppercase text-primary sm:flex">
              <Loader2 className="h-3 w-3 animate-spin" /> Generating
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={regenerate}
          >
            <RefreshCw className="h-4 w-4" />{" "}
            <span className="hidden sm:inline">Regenerate</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => toast.info("Share link copied (demo)")}
          >
            <Share2 className="h-4 w-4" />{" "}
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => toast.info("Export coming soon")}
          >
            <Download className="h-4 w-4" />{" "}
            <span className="hidden sm:inline">Export</span>
          </Button>
          <div className="mx-2 hidden h-5 w-px bg-border sm:block" />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setPaletteOpen((v) => !v)}
            aria-label="Toggle palette"
          >
            {paletteOpen ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRightOpen className="h-4 w-4" />
            )}
          </Button>
          <ProfileMenu />
        </div>
      </header>

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {/* Canvas */}
        <div className="relative min-w-0 flex-1">
          <ReactFlow
            key={proxyKey}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            proOptions={{ hideAttribution: true }}
            defaultEdgeOptions={{
              type: "smoothstep",
              markerEnd: { type: MarkerType.ArrowClosed },
            }}
            className="bg-background"
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={24}
              size={1.4}
              color="var(--grid)"
            />
            <Controls
              position="bottom-left"
              showInteractive={false}
              className="rounded-md! border! border-border! bg-card! text-foreground! shadow-lg! [&>button]:border-0! [&>button]:bg-transparent! [&>button:hover]:bg-muted! [&_svg]:fill-foreground!"
            />
            <MiniMap
              pannable
              zoomable
              className="rounded-md! border! border-border! bg-card! text-foreground! shadow-lg!"
              maskColor="oklch(0 0 0 / 50%)"
              nodeColor={() => "var(--primary)"}
            />
          </ReactFlow>

          {/* Bottom prompt bar */}
          <form
            onSubmit={applyFollowUp}
            className="pointer-events-none absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-2xl items-center gap-2 px-4"
          >
            <div className="pointer-events-auto flex w-full items-center gap-2 rounded-full border border-border bg-card/90 py-2 pl-4 pr-2 shadow-2xl shadow-black/40 backdrop-blur">
              <Send className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                placeholder="Refine: e.g. 'add a Redis cache' or 'split into microservices'"
                className="flex-1 bg-transparent font-mono text-xs outline-none placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!followUp.trim() || isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  "Refine"
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Components palette */}
        <div
          className={cn(
            "transition-[width,opacity] duration-200",
            paletteOpen ? "w-72 opacity-100" : "w-0 opacity-0",
          )}
        >
          {paletteOpen && (
            <ComponentsPalette onAdd={addComponent} className="h-full w-72" />
          )}
        </div>
      </div>
    </div>
  );
}
