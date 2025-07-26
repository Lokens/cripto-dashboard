import { render, screen } from '@testing-library/react';
import CoinList from '../components/coinList';
import { Coins } from '../interfaces/coins.interface';

jest.mock('../components/coinCard', () => ({
  __esModule: true,
  default: ({ coin }: { coin: Coins }) => (
    <div data-testid="coin-card">{coin.name}</div>
  ),
}));

jest.mock('next/link', () => {
  return ({ children }: any) => children;
});

const mockCoins: Coins[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    image: 'https://image.com/btc.png',
    current_price: 20000,
    symbol: 'btc',
    market_cap: 1000000000,
    market_cap_rank: 1,
    total_volume: 500000000,
    price_change_percentage_24h: 2.5,
    ath: 0,
    ath_change_percentage: 0,
    ath_date: '',
    atl: 0,
    atl_change_percentage: 0,
    atl_date: '',
    circulating_supply: 0,
    fully_diluted_valuation: 0,
    high_24h: 0,
    last_updated: '',
    low_24h: 0,
    market_cap_change_24h: 0,
    market_cap_change_percentage_24h: 0,
    max_supply: 0,
    price_change_24h: 0,
    roi: undefined,
    total_supply: 0
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    image: 'https://image.com/eth.png',
    current_price: 1500,
    symbol: 'eth',
    market_cap: 500000000,
    market_cap_rank: 2,
    total_volume: 250000000,
    price_change_percentage_24h: -1.2,
    ath: 0,
    ath_change_percentage: 0,
    ath_date: '',
    atl: 0,
    atl_change_percentage: 0,
    atl_date: '',
    circulating_supply: 0,
    fully_diluted_valuation: 0,
    high_24h: 0,
    last_updated: '',
    low_24h: 0,
    market_cap_change_24h: 0,
    market_cap_change_percentage_24h: 0,
    max_supply: 0,
    price_change_24h: 0,
    roi: undefined,
    total_supply: 0
  },
];

describe('CoinList component', () => {
  it('renders a list of CoinCards', () => {
    render(<CoinList coins={mockCoins} />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();

    const cards = screen.getAllByTestId('coin-card');
    expect(cards).toHaveLength(2);
  });
});
