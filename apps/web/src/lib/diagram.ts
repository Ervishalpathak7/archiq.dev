import { DesignSchema } from "@archiq/types";

export const buildDiagram = (design: DesignSchema) => {
  const nodes = design.components.map((component, index) => ({
    id: component.id,
    data: { label: component.label },
    position: {
      x: (index % 3) * 200,
      y: Math.floor(index / 3) * 100,
    },
  }));

  const edges = design.connections.map((connection, index) => ({
    id: connection.id,
    source: connection.source,
    target: connection.target,
  }));

  return { nodes , edges}
};
