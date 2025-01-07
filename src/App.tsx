import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";
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

const queryClient = new QueryClient();

function App() {
  return (
    <PrimeReactProvider>
      <WagmiProvider config={config}>
        <MagicProvider>
          <QueryClientProvider client={queryClient}>
            <NotificationProvider>
              <SmartWalletProvider>
                <Home />
              </SmartWalletProvider>
            </NotificationProvider>
          </QueryClientProvider>
        </MagicProvider>
      </WagmiProvider>
    </PrimeReactProvider>
  );
}

export default App;
