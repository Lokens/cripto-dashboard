"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Currency = "brl" | "usd";

interface CurrencyContextProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatCurrencyValue: (value: number) => string;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency deve ser usado dentro de CurrencyProvider");
  return ctx;
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("brl");

  const formatCurrencyValue = (value: number) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrencyValue }}>
      {children}
    </CurrencyContext.Provider>
  );
}
