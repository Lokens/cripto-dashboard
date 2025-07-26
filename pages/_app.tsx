import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/header";
import { CurrencyProvider } from "../contexts/currencyContext";
import "../globals.css";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <ErrorBoundary>
          <CurrencyProvider>
            <Header />
            <Component {...pageProps} />
          </CurrencyProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
