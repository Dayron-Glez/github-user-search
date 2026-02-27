"use client";
import { useState, useCallback } from "react";

export interface SearchEntry {
  username: string;
  avatarUrl: string;
  name: string | null;
  searchedAt: number;
}

const STORAGE_KEY = "devfinder_search_history";
const MAX_ENTRIES = 10;

function readHistory(): SearchEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const writeHistory = (entries: SearchEntry[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchEntry[]>(readHistory);

  const addEntry = useCallback(
    (username: string, avatarUrl: string, name: string | null) => {
      setHistory((prev) => {
        const filtered = prev.filter(
          (e) => e.username.toLowerCase() !== username.toLowerCase(),
        );
        const newEntry: SearchEntry = {
          username,
          avatarUrl,
          name,
          searchedAt: Date.now(),
        };
        const updated = [newEntry, ...filtered].slice(0, MAX_ENTRIES);
        writeHistory(updated);
        return updated;
      });
    },
    [],
  );

  const removeEntry = useCallback((username: string): void => {
    setHistory((prev) => {
      const updated = prev.filter(
        (e) => e.username.toLowerCase() !== username.toLowerCase(),
      );
      writeHistory(updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback((): void => {
    writeHistory([]);
    setHistory([]);
  }, []);

  return { history, addEntry, removeEntry, clearHistory };
}
