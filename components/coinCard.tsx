import { useCurrency } from "../contexts/currencyContext";
import { Coins } from "../interfaces/coins.interface";

export default function CoinCard({ coin }: { coin: Coins }) {
  const { formatCurrencyValue } = useCurrency();
  return (
    <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded">
      <img src={coin.image} alt={coin.name} className="w-8 h-8" />
      <p className="font-bold">{coin.name}</p>
      <p>
        {formatCurrencyValue(coin.current_price)}
      </p>
    </div>
  );
}
