"use client";
import { useState } from "react";
import CoinList from "../components/coinList";
import ErrorMessage from "../components/error";
import Loading from "../components/loading";
import { useCurrency } from "../contexts/currencyContext";
import { useGetCoins } from "../queries/useCoins";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const { currency } = useCurrency();

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const { data, isLoading, isError } = useGetCoins({
    vs_currency: currency,
    order: "market_cap_desc",
    per_page: 20,
    page: 1
  });


  const filtered = data?.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isError)
    return <ErrorMessage />

  if (isLoading)
    return <Loading />

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <CoinList coins={filtered} />
    </main>
  );
}