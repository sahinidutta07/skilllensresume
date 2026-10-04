import { createContext, useContext, useState, type ReactNode } from "react";
import type { AnalysisResult } from "@/lib/resumeApi";

type AnalysisContextType = {
  result: AnalysisResult | null;
  setResult: (result: AnalysisResult) => void;
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined,
);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  return (
    <AnalysisContext.Provider value={{ result, setResult }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);

  if (!context) {
    throw new Error("useAnalysis must be used inside AnalysisProvider");
  }

  return context;
}