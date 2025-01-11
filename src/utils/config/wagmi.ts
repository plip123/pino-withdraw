import {
  arbitrum,
  arbitrumSepolia,
  mainnet,
  polygon,
  polygonAmoy,
  sepolia,
} from "wagmi/chains";
import { Chain, http } from "viem";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  phantomWallet,
  rabbyWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig } from "wagmi";
import { env } from "@/utils";

const SUPPORTED_CHAINS: Chain[] = [
  mainnet,
  polygon,
  arbitrum,
  sepolia,
  polygonAmoy,
  arbitrumSepolia,
];

const CUSTOM_RPC_BY_CHAIN: Record<number, string> = {
  [mainnet.id]: `https://eth-mainnet.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`,
  [polygon.id]: `https://polygon-mainnet.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`,
  [arbitrum.id]: `https://arb-mainnet.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`,
  [sepolia.id]: `https://eth-sepolia.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`,
  [polygonAmoy.id]: `https://polygon-amoy.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`,
  [arbitrumSepolia.id]: `https://arb-sepolia.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`,
};

const connectors = connectorsForWallets(
  [
    {
      groupName: "Sugessted by Pino",
      wallets: [
        metaMaskWallet,
        rabbyWallet,
        walletConnectWallet,
        phantomWallet,
      ],
    },
  ],
  {
    appName: "Pino Withdraw USDT",
    projectId: env.VITE_WC_PROJECT_ID,
  },
);

export const config = createConfig({
  autoConnect: false,
  projectId: env.VITE_WC_PROJECT_ID,
  // @ts-expect-error Wagmi wait for constant type
  chains: SUPPORTED_CHAINS,
  transports: {
    [mainnet.id]: http(CUSTOM_RPC_BY_CHAIN[mainnet.id]),
    [polygon.id]: http(CUSTOM_RPC_BY_CHAIN[polygon.id]),
    [arbitrum.id]: http(CUSTOM_RPC_BY_CHAIN[arbitrum.id]),
    [sepolia.id]: http(CUSTOM_RPC_BY_CHAIN[sepolia.id]),
    [polygonAmoy.id]: http(CUSTOM_RPC_BY_CHAIN[polygonAmoy.id]),
    [arbitrumSepolia.id]: http(CUSTOM_RPC_BY_CHAIN[arbitrumSepolia.id]),
  },
  connectors,
});
