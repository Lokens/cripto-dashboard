import { render } from "@testing-library/react";
import CoinChart from "../components/coinChart";

jest.mock("../contexts/currencyContext", () => ({
  useCurrency: () => ({
    currency: "brl",
    formatCurrencyValue: (val: number) => `R$ ${val.toFixed(2)}`,
  }),
}));

const mockChart = {
  prices: [
    [1687000000000, 100.5],
    [1687086400000, 102.7],
    [1687172800000, 101.3],
  ],
};

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: jest.fn(() => ({
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn(() => ({ data: [] })),
      putImageData: jest.fn(),
      createImageData: jest.fn(() => []),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      fillText: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      measureText: jest.fn(() => ({ width: 0 })),
      transform: jest.fn(),
      rect: jest.fn(),
      clip: jest.fn(),
    })),
  });

  Object.defineProperty(HTMLCanvasElement.prototype, 'width', {
    get: () => 300,
    set: jest.fn(),
  });

  Object.defineProperty(HTMLCanvasElement.prototype, 'height', {
    get: () => 150,
    set: jest.fn(),
  });
});

describe("CoinChart", () => {
  it("renderiza o gráfico com um canvas", () => {
    const { container } = render(<CoinChart chart={mockChart} />);
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });
});
