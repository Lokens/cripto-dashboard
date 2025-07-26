import { render, screen } from '@testing-library/react';
import CoinCard from '../components/coinCard';

jest.mock('../contexts/currencyContext', () => ({
    useCurrency: () => ({
        formatCurrencyValue: (value: number) => `R$ ${value.toFixed(2)}`,
    }),
}));

const mockCoin = {
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 20000,
};

describe('CoinCard component', () => {
    it('renders coin info correctly', () => {
        render(<CoinCard coin={mockCoin} />);

        // Verifica se imagem está correta e com alt
        const img = screen.getByRole('img', { name: /bitcoin/i });
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', mockCoin.image);

        expect(screen.getByText(/bitcoin/i)).toBeInTheDocument();

        expect(screen.getByText('R$ 20000.00')).toBeInTheDocument();
    });
});
