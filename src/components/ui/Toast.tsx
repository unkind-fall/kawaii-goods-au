"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createContext, useCallback, useContext, useState } from "react";

type ToastVariant = "happy" | "sad" | "surprised";

type Toast = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastContextType = {
  toast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

const FACE: Record<ToastVariant, string> = {
  happy: "(o\u2217\u25E1\u2217o)",
  sad: "(\u3002\u2022\u0301\uFE3F\u2022\u0300\u3002)",
  surprised: "(\u00B0o\u00B0)",
};

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, variant: ToastVariant = "happy") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-20 left-0 right-0 z-[60] flex flex-col items-center gap-2 sm:bottom-6">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="pointer-events-auto inline-flex items-center gap-3 rounded-kawaii bg-white/95 px-5 py-3 shadow-kawaii ring-1 ring-kawaii-pink/30 backdrop-blur"
            >
              <span className="text-sm" aria-hidden>
                {FACE[t.variant]}
              </span>
              <span className="text-sm font-medium">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
