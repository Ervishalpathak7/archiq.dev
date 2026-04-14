"use client";

import { buildDiagram } from "@/lib/diagram";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { type Node, type Edge } from "@xyflow/react";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export default function Page() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("q");
  const [scale, setScale] = useState("");
  const [techStack, setTechStack] = useState("");
  const [traffic, setTraffic] = useState("");
  const [fullResponse, setFullResponse] = useState("");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const handleGenerate = async () => {
    const response = await fetch("http://localhost:4000/api/generate", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: prompt,
        techStack,
        scale,
        traffic,
        type: "Full stack",
      }),
    });
    if (!response.ok) {
      console.log(response);
    } else {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let fullDesign = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder
          .decode(value)
          .split("\n")
          .filter((line) => line.startsWith("data: "))
          .map((line) => line.replace("data: ", ""))
          .join("");
        fullDesign += text;
      }
      setFullResponse(() => fullDesign);
      console.log("Full response : ", fullDesign);
      const design = JSON.parse(fullDesign);
      const { nodes, edges } = buildDiagram(design);
      setNodes(nodes);
      setEdges(edges);
    }
  };

  return (
    <div>
      <h2>Designing: {prompt}</h2>
      <div>
        <label>Scale</label>
        <select onChange={(e) => setScale(e.target.value)} value={scale}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="production">Production Grade</option>
        </select>
      </div>

      <div>
        <label>Expected Traffic</label>
        <select onChange={(e) => setTraffic(e.target.value)} value={traffic}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label>Tech Stack (optional)</label>
        <input
          onChange={(e) => setTechStack(e.target.value)}
          value={techStack}
          placeholder="React, Node.js, PostgreSQL..."
        />
      </div>
      <div>
        <button onClick={handleGenerate}>Generate Design</button>
      </div>
      <div style={{ width: "100%", height: "500px" }}>
        <ReactFlow nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}
