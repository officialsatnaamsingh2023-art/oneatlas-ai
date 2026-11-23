"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Preferences = {
  defaultSort: "name" | "newest" | "price";
  compactCards: boolean;
  reduceMotion: boolean;
  currency: "USD" | "INR";
};

type AppContextValue = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  preferences: Preferences;
  updatePreferences: (next: Partial<Preferences>) => void;
};

const DEFAULT_PREFERENCES: Preferences = {
  defaultSort: "name",
  compactCards: false,
  reduceMotion: false,
  currency: "USD",
};

const FAVORITES_KEY = "oneatlas:favorites";
const PREFERENCES_KEY = "oneatlas:preferences";

const AppContext = createContext<AppContextValue | null>(null);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readPreferences(value: unknown): Preferences {
  if (!isRecord(value)) return DEFAULT_PREFERENCES;

  return {
    defaultSort:
      value.defaultSort === "newest" || value.defaultSort === "price"
        ? value.defaultSort
        : "name",
    compactCards:
      typeof value.compactCards === "boolean" ? value.compactCards : false,
    reduceMotion:
      typeof value.reduceMotion === "boolean" ? value.reduceMotion : false,
    currency: value.currency === "INR" ? "INR" : "USD",
  };
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [preferences, setPreferences] =
    useState<Preferences>(DEFAULT_PREFERENCES);
  const [ready, setReady] = useState(false);

  // Load browser-only preferences after mount. Children wait until hydration
  // is complete so pages can initialize from the restored preferences.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const savedFavorites = window.localStorage.getItem(FAVORITES_KEY);
        const savedPreferences = window.localStorage.getItem(PREFERENCES_KEY);

        if (savedFavorites) {
          const parsed: unknown = JSON.parse(savedFavorites);
          if (Array.isArray(parsed)) {
            setFavorites(
              parsed.filter((id): id is string => typeof id === "string")
            );
          }
        }

        if (savedPreferences) {
          const parsed: unknown = JSON.parse(savedPreferences);
          setPreferences(readPreferences(parsed));
        }
      } catch {
        window.localStorage.removeItem(FAVORITES_KEY);
        window.localStorage.removeItem(PREFERENCES_KEY);
      } finally {
        setReady(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites, ready]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  }, [preferences, ready]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const updatePreferences = useCallback((next: Partial<Preferences>) => {
    setPreferences((current) => ({ ...current, ...next }));
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      preferences,
      updatePreferences,
    }),
    [favorites, toggleFavorite, isFavorite, preferences, updatePreferences]
  );

  if (!ready) return null;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProviders");
  }

  return context;
}
