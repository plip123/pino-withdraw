import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";

import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/utils";
import {
  MagicProvider,
  NotificationProvider,
  SmartWalletProvider,
} from "@/providers";
import { Home } from "@/features/home";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { DEFAULT_CHAIN } from "./constants";

const queryClient = new QueryClient();

function App() {
  return (
    <PrimeReactProvider>
      <WagmiProvider config={config}>
        <MagicProvider>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              initialChain={DEFAULT_CHAIN.id}
              appInfo={{
                appName: "R2R DeFi Token",
                learnMoreUrl: "https://r2rdefi.com/e4fc66a5",
              }}
              showRecentTransactions={true}
              locale="es-419"
              theme={darkTheme({
                fontStack: "system",
                overlayBlur: "small",
              })}
            >
              <NotificationProvider>
                <SmartWalletProvider>
                  <Home />
                </SmartWalletProvider>
              </NotificationProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </MagicProvider>
      </WagmiProvider>
    </PrimeReactProvider>
  );
}

export default App;
