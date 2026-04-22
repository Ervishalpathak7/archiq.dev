/**
 * Local design persistence (localStorage).
 * Separated from auth to respect single-responsibility.
 */

import { fetchDesignByUser } from "@/api/designs";
import { DesignSummary } from "@/types";

export async function loadDesigns(): Promise<DesignSummary[]> {
  await fetchDesignByUser();
  return [];
}

export function saveDesign(d: DesignSummary) { }

export function getDesign(id: string): DesignSummary | undefined {
  return undefined;
}

export function deleteDesign(id: string) { }
