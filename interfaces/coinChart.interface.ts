export interface ICoinsChart {
	id: string;
	vs_currency: string;
	days?: number;
}

export interface CoinsChart {
	prices: [number, number][];
	market_caps: [number, number][];
	total_volumes: [number, number][];
}
