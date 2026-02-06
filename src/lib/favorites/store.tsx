"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type FavoritesContextType = {
  favorites: Set<string>;
  toggle: (slug: string) => boolean;
  isFavorite: (slug: string) => boolean;
  count: number;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: new Set(),
  toggle: () => false,
  isFavorite: () => false,
  count: 0,
});

const STORAGE_KEY = "kawaii_favorites";

function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function saveFavorites(faves: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(faves)));
  } catch {
    // ignore
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const toggle = useCallback(
    (slug: string) => {
      const next = new Set(favorites);
      const added = !next.has(slug);
      if (added) next.add(slug);
      else next.delete(slug);
      setFavorites(next);
      saveFavorites(next);
      return added;
    },
    [favorites],
  );

  const isFavorite = useCallback((slug: string) => favorites.has(slug), [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite, count: favorites.size }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
