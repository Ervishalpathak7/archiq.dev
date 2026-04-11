"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const handleDesignGeneration = () => {
    router.push(`/design/new?q=${encodeURIComponent(prompt)}`);
  };
  return (
    <div>
      <h1>Archiq</h1>
      <div>
        <Textarea onChange={(e) => setPrompt(e.target.value)} value={prompt} />
        <Button onClick={handleDesignGeneration} variant="outline">
          Generate Design
        </Button>
      </div>
    </div>
  );
}
