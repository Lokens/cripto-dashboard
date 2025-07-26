import Link from "next/link";
import { Coins } from "../interfaces/coins.interface";
import CoinCard from "./coinCard";

export default function CoinList({ coins }: { coins: Coins[] }) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {coins.map((coin) => (
        <Link key={coin.id} href={`/coin/${coin.id}`}>
          <CoinCard coin={coin} />
        </Link>
      ))}
    </section>
  );
}
