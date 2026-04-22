/**
 * Local design persistence (localStorage).
 * Separated from auth to respect single-responsibility.
 */

export type DesignSummary = {
  id: string;
  title: string;
  prompt: string;
  createdAt: number;
};

const DESIGNS_KEY = "stitch-designs";

export function loadDesigns(): DesignSummary[] {
  return [];
}

export function saveDesign(d: DesignSummary) {}

export function getDesign(id: string): DesignSummary | undefined {
  return undefined;
}

export function deleteDesign(id: string) {}
