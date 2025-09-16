import type { Edge,Node as FlowNode } from "@xyflow/react";

// Utility functions to save and get data from localStorage

export const saveToStorage = (key: string, value: Edge[] | FlowNode[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Used T to make it generic for both Edge and Node types
export const getFromStorage = <T>(key: string, fallback: T): T => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as T : fallback;
};

