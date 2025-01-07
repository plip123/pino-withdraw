import { bsc, mainnet, polygon } from "wagmi/chains";
import { Chain, http } from "viem";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rabbyWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConnector, createConfig } from "wagmi";
import { dedicatedWalletConnector } from "@magiclabs/wagmi-connector";
import { env } from "@/utils";

const SUPPORTED_CHAINS: Chain[] = [polygon, bsc];

const CUSTOM_RPC_BY_CHAIN: Record<number, string> = {
  [polygon.id]: `https://polygon-mainnet.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`,
  [bsc.id]: `https://bnb-mainnet.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`,
};

export const getMagicConnectorFn = (
  id: string,
  name: string = "Magic",
  chainId: number = polygon.id,
) => {
  const walletDetails = {
    id,
    name,
    rdns: "Magic",
    iconUrl: "https://r2rtoken.com/assets/aiBg-DFJx_raV.png",
    iconBackground: "#fff",
    installed: true,
    iconAccent: "#b4acfc",
    downloadUrls: {},
    type: id,
  };

  const magicConnector = dedicatedWalletConnector({
    chains: SUPPORTED_CHAINS,
    options: {
      networks: [
        {
          chainId: chainId,
          rpcUrl: CUSTOM_RPC_BY_CHAIN[chainId],
        },
      ],
      apiKey: env.VITE_MAGIC_API_KEY,
      isDarkMode: false,
      oauthOptions: {
        providers: ["google", "github", "twitter"],
      },
      magicSdkConfiguration: {
        network: {
          rpcUrl: CUSTOM_RPC_BY_CHAIN[chainId],
          chainId,
        },
      },
    },
  });

  return createConnector((config) => ({
    ...magicConnector(config),
    ...walletDetails,
    type: id,
    id,
  }));
};

const getMagicConnector =
  (id: string, name: string = "Magic", chainId: number = polygon.id) =>
  () => ({
    id,
    name,
    rdns: "Magic",
    iconUrl: "https://r2rtoken.com/assets/aiBg-DFJx_raV.png",
    iconBackground: "#fff",
    installed: true,
    iconAccent: "#b4acfc",
    downloadUrls: {},
    type: id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createConnector: (walletDetails: any) => {
      const magicConnector = dedicatedWalletConnector({
        chains: SUPPORTED_CHAINS,
        options: {
          networks: [
            {
              chainId: chainId,
              rpcUrl: CUSTOM_RPC_BY_CHAIN[chainId],
            },
          ],
          apiKey: env.VITE_MAGIC_API_KEY,
          isDarkMode: false,
          oauthOptions: {
            providers: ["google", "github", "twitter"],
          },
          magicSdkConfiguration: {
            network: {
              rpcUrl: CUSTOM_RPC_BY_CHAIN[chainId],
              chainId,
            },
          },
        },
      });

      return createConnector((config) => ({
        ...magicConnector(config),
        ...walletDetails,
        type: id,
        id,
      }));
    },
  });

const connectors = connectorsForWallets(
  [
    {
      groupName: "Sugeridas por R2R Team",
      wallets: [
        getMagicConnector(
          `magic-${polygon.id}`,
          `Magic ${polygon.name}`,
          polygon.id,
        ),
        metaMaskWallet,
        rabbyWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: "R2R DeFi Token",
    projectId: env.VITE_PROJECT_ID,
  },
);

export const config = createConfig({
  autoConnect: false,
  projectId: env.VITE_PROJECT_ID,
  // @ts-expect-error Wagmi wait for constant type
  chains: SUPPORTED_CHAINS,
  transports: {
    [mainnet.id]: http(CUSTOM_RPC_BY_CHAIN[mainnet.id]),
    [polygon.id]: http(CUSTOM_RPC_BY_CHAIN[polygon.id]),
    [bsc.id]: http(CUSTOM_RPC_BY_CHAIN[bsc.id]),
  },
  connectors,
});
