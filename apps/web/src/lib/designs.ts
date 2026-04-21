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
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DESIGNS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DesignSummary[];
  } catch {
    return [];
  }
}

export function saveDesign(d: DesignSummary) {
  const list = loadDesigns();
  const next = [d, ...list.filter((x) => x.id !== d.id)].slice(0, 50);
  localStorage.setItem(DESIGNS_KEY, JSON.stringify(next));
}

export function getDesign(id: string): DesignSummary | undefined {
  return loadDesigns().find((d) => d.id === id);
}

export function deleteDesign(id: string) {
  const list = loadDesigns().filter((d) => d.id !== id);
  localStorage.setItem(DESIGNS_KEY, JSON.stringify(list));
}
