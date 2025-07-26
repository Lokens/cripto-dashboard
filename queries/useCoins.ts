import { useQuery } from "@tanstack/react-query";
import { Coins, ICoinsList } from "../interfaces/coins.interface";

const BASE_URL = process.env.NEXT_PUBLIC_COIN_API

export function useGetCoins(params: ICoinsList) {
  return useQuery<Coins[]>({
    queryKey: ["coins", params],
    queryFn: async () => {
      const url = new URL(BASE_URL + '/markets');

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value.toString());
        }
      });

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Erro ao buscar moedas");

      const data = await res.json();
      return data as Coins[];
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}
