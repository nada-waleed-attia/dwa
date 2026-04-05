"use client";

import { useState, useCallback } from "react";

interface UseSectionManagerOptions {
  maxConcurrent?: number;
  rootMargin?: string;
  threshold?: number;
}

export function useSectionManager(
  sectionIds: string[],
  options: UseSectionManagerOptions = {}
) {
  // Simple Set to track which sections should render
  const [readySections, setReadySections] = useState<Set<string>>(new Set());

  // Schedule a section to load
  const scheduleSection = useCallback(
    (id: string, priority?: number) => {
      setReadySections((prev) => {
        if (prev.has(id)) return prev; // Already ready
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });
    },
    []
  );

  // Boost priority for user interaction
  const boostPriority = useCallback((id: string) => {
    setReadySections((prev) => {
      if (prev.has(id)) return prev;
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  }, []);

  // Check if section should render
  const shouldRender = useCallback(
    (id: string): boolean => {
      return readySections.has(id);
    },
    [readySections]
  );

  return {
    scheduleSection,
    boostPriority,
    shouldRender,
  };
}
