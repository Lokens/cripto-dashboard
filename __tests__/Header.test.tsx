import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import Header from "../components/header";

// Mocks controláveis
const mockSetTheme = jest.fn();
const mockSetCurrency = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mockSetTheme,
  }),
}));

jest.mock("../contexts/currencyContext", () => ({
  useCurrency: () => ({
    currency: "brl",
    setCurrency: mockSetCurrency,
    formatCurrencyValue: (val: number) => `R$ ${val.toFixed(2)}`,
  }),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Header", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      isReady: true,
      query: {},
      pathname: "/",
      replace: mockReplace,
      back: mockBack,
    });
  });

  it("renderiza corretamente o título padrão", () => {
    render(<Header />);
    expect(screen.getByText("Crypto Dashboard")).toBeInTheDocument();
  });

  it("permite troca de tema", () => {
    render(<Header />);
    const themeButton = screen.getByRole("button", { name: "🌙" });
    fireEvent.click(themeButton);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("permite troca de moeda", () => {
    render(<Header />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "usd" } });
    expect(mockSetCurrency).toHaveBeenCalledWith("usd");
  });

  it("atualiza busca no router ao digitar", () => {
    render(<Header />);
    const input = screen.getByPlaceholderText("Buscar moeda...");
    fireEvent.change(input, { target: { value: "bitcoin" } });
    expect(mockReplace).toHaveBeenCalledWith(
      {
        pathname: "/",
        query: { search: "bitcoin" },
      },
      undefined,
      { shallow: true }
    );
  });

  it("mostra botão de voltar na página de detalhes", () => {
    (useRouter as jest.Mock).mockReturnValue({
      isReady: true,
      pathname: "/coin",
      query: { id: "bitcoin" },
      replace: mockReplace,
      back: mockBack,
    });

    render(<Header />);
    expect(screen.getByText("←")).toBeInTheDocument();
    expect(screen.getByText("BITCOIN")).toBeInTheDocument();
  });
});
