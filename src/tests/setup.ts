import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());

// jsdom provides localStorage, but some environments might stub it out.
if (
  typeof window !== "undefined" &&
  (typeof window.localStorage === "undefined" || typeof window.localStorage?.getItem !== "function")
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).localStorage = (() => {
    const map = new Map<string, string>();
    return {
      getItem: (k: string) => (map.has(k) ? map.get(k)! : null),
      setItem: (k: string, v: string) => void map.set(k, String(v)),
      removeItem: (k: string) => void map.delete(k),
      clear: () => void map.clear(),
      key: (i: number) => Array.from(map.keys())[i] ?? null,
      get length() {
        return map.size;
      },
    };
  })();
}
