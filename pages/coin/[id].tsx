"use client";

import { useRouter } from "next/router";
import CoinsChart from "../../components/coinChart";
import ErrorMessage from "../../components/error";
import Loading from "../../components/loading";
import { useCurrency } from "../../contexts/currencyContext";
import { useGetCoinsChart } from "../../queries/useCoinGetChart";

export default function CoinPage() {
  const router = useRouter();
  const { id } = router.query;
  const { currency } = useCurrency();

  const { data: chart, isLoading, isError } = useGetCoinsChart({
    id: id as string,
    vs_currency: currency,
  });

  if (isError) return <ErrorMessage />;

  if (isLoading || !chart) return <Loading />;

  return (
    <main className="p-4 dark:bg-gray-900 dark:text-white">
      <CoinsChart chart={chart} />
    </main>
  );
}
