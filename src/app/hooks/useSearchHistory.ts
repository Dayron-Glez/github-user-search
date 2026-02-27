"use client";
import { useCallback, useSyncExternalStore } from "react";

export interface SearchEntry {
  username: string;
  avatarUrl: string;
  name: string | null;
  searchedAt: number;
}

const STORAGE_KEY = "devfinder_search_history";
const MAX_ENTRIES = 10;

let listeners: Array<() => void> = [];

const emitChange = (): void => {
  listeners.forEach((l) => l());
};

const subscribe = (listener: () => void): (() => void) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const getSnapshot = (): SearchEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const EMPTY: SearchEntry[] = [];
const getServerSnapshot = (): SearchEntry[] => EMPTY;

let cachedSnapshot: SearchEntry[] = [];
let cachedRaw: string | null = null;

const getStableSnapshot = (): SearchEntry[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = raw ? JSON.parse(raw) : [];
  }
  return cachedSnapshot;
};

const writeHistory = (entries: SearchEntry[]): void => {
  const json = JSON.stringify(entries);
  localStorage.setItem(STORAGE_KEY, json);
  cachedRaw = json;
  cachedSnapshot = entries;
  emitChange();
};

export const useSearchHistory = () => {
  const history = useSyncExternalStore(subscribe, getStableSnapshot, getServerSnapshot);

  const addEntry = useCallback(
    (username: string, avatarUrl: string, name: string | null) => {
      const prev = getSnapshot();
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
    },
    [],
  );

  const removeEntry = useCallback((username: string): void => {
    const prev = getSnapshot();
    const updated = prev.filter(
      (e) => e.username.toLowerCase() !== username.toLowerCase(),
    );
    writeHistory(updated);
  }, []);

  const clearHistory = useCallback((): void => {
    writeHistory([]);
  }, []);

  return { history, addEntry, removeEntry, clearHistory };
};
