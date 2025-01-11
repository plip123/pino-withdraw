import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";

import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/utils";
import { AuthExpirationProvider, NotificationProvider } from "@/providers";
import { Home } from "@/features/home";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { DEFAULT_CHAIN } from "./constants";

const queryClient = new QueryClient();

function App() {
  return (
    <PrimeReactProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            initialChain={DEFAULT_CHAIN.id}
            appInfo={{
              appName: "Pino Withdraw USDT",
              learnMoreUrl: "https://cpservice.es/",
            }}
            showRecentTransactions={true}
            locale="es-419"
            theme={darkTheme({
              fontStack: "system",
              overlayBlur: "small",
            })}
          >
            <NotificationProvider>
              <AuthExpirationProvider>
                <Home />
              </AuthExpirationProvider>
            </NotificationProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </PrimeReactProvider>
  );
}

export default App;
