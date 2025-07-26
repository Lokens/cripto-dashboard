import { useQuery } from "@tanstack/react-query";
import { CoinsChart, ICoinsChart } from "../interfaces/coinChart.interface";

const BASE_URL = process.env.NEXT_PUBLIC_COIN_API;

export function useGetCoinsChart({
  id,
  vs_currency,
  days = 7,
}: ICoinsChart) {
  return useQuery<CoinsChart, Error>({
    queryKey: ["coinsChart", id, vs_currency, days],
    queryFn: async () => {
      if (!id) throw new Error("ID inválido");

      const url = new URL(`${BASE_URL}/${id}/market_chart`);
      url.searchParams.append("vs_currency", vs_currency);
      url.searchParams.append("days", days.toString());

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Erro ao buscar detalhes da moeda");

      const data = await res.json();
      return data as CoinsChart;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
