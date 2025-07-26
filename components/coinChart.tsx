"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useCurrency } from "../contexts/currencyContext";
import { CoinsChart } from "../interfaces/coinChart.interface";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function CoinChart({ chart }: { chart: CoinsChart }) {
  const { currency, formatCurrencyValue } = useCurrency();

  const labels = chart.prices.map(([timestamp]) =>
    new Date(timestamp).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  );

  const data = {
    labels,
    datasets: [
      {
        label: `Preços (${currency.toUpperCase()})`,
        data: chart.prices.map(([, price]) => price),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3b82f6",
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Preços nos últimos dias (${currency.toUpperCase()})`,
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        enabled: true,
        mode: "nearest" as const,
        intersect: false,
        callbacks: {
          label: (context: any) => {
            const price = context.parsed.y;
            return `Preço: ${formatCurrencyValue(price)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Data",
          font: {
            weight: "bold" as const,
          },
        },
        ticks: {
          maxRotation: 45,
          minRotation: 30,
          maxTicksLimit: 10,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: `Preço (${currency.toUpperCase()})`,
          font: {
            weight: "bold" as const,
          },
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="w-full h-[70vh] md:h-[60vh] lg:h-[50vh]">
      <Line data={data} options={options} />
    </div>
  );
}
