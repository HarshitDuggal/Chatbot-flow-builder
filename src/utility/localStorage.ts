import type { Edge,Node as FlowNode } from "@xyflow/react";

export const saveToStorage = (key: string, value: Edge[] | FlowNode[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = <T>(key: string, fallback: T): T => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as T : fallback;
};

