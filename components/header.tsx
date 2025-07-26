"use client";

import { useTheme } from "next-themes";
import { useCurrency } from "../contexts/currencyContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const querySearch = (router.query.search as string) || "";
    setSearchValue(querySearch);
  }, [router.isReady, router.query.search]);

  if (!mounted) return null;

  const coinName = router.query.id as string;
  const isHomePage = router.pathname === "/";
  const showCoinDetail = !isHomePage;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    const newQuery = { ...router.query };
    if (value) {
      newQuery.search = value;
    } else {
      delete newQuery.search;
    }
    router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
  };

  return (
    <header className="p-4 flex flex-wrap justify-between items-center bg-gray-100 dark:bg-gray-800 gap-4">
      <div className="flex items-center">
        {showCoinDetail && (
          <button
            onClick={() => router.back()}
            className="text-2xl cursor-pointer font-bold flex items-center justify-center"
            style={{ lineHeight: 1 }}
          >
            ←
          </button>
        )}

        <h1 className="text-xl font-bold flex-1 text-center">
          {coinName ? coinName.toUpperCase() : "Crypto Dashboard"}
        </h1>
      </div>

      {!showCoinDetail && (
        <input
          type="text"
          placeholder="Buscar moeda..."
          value={searchValue}
          onChange={handleSearchChange}
          className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />
      )}

      <div className="flex items-center gap-4">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as "brl" | "usd")}
          className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 cursor-pointer "
        >
          <option value="brl">R$ BRL</option>
          <option value="usd">$ USD</option>
        </select>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 cursor-pointer"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
