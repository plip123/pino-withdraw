import {
  arbitrum,
  arbitrumSepolia,
  Chain,
  mainnet,
  polygon,
  polygonAmoy,
  sepolia,
} from "wagmi/chains";

export const CUSTOM_RPC_BY_CHAIN = {
  [mainnet.id]: `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`,
  [polygon.id]: `https://polygon-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`,
  [arbitrum.id]: `https://arb-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`,
  [sepolia.id]: `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`,
  [polygonAmoy.id]: `https://polygon-amoy.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`,
  [arbitrumSepolia.id]: `https://arb-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`,
};

export const CHAIN_SHORT_NAME: Record<SUPPORTED_CHAIN_IDS, string> = {
  [mainnet.id]: "eth",
  [polygon.id]: "pol",
  [arbitrum.id]: "arb",
  [sepolia.id]: "sep",
  [polygonAmoy.id]: "amoy",
  [arbitrumSepolia.id]: "arb-sep",
};

export const CHAIN_NAME_FOR_ALCHEMY: Record<SUPPORTED_CHAIN_IDS, string> = {
  [mainnet.id]: "eth-mainnet",
  [polygon.id]: "polygon-mainnet",
  [arbitrum.id]: "arb-mainnet",
  [sepolia.id]: "eth-sepolia",
  [polygonAmoy.id]: "polygon-amoy",
  [arbitrumSepolia.id]: "arb-sepolia",
};

export const SUPPORTED_CHAINS: Record<SUPPORTED_CHAIN_IDS, Chain> = {
  [mainnet.id]: mainnet,
  [polygon.id]: polygon,
  [arbitrum.id]: arbitrum,
  [sepolia.id]: sepolia,
  [polygonAmoy.id]: polygonAmoy,
  [arbitrumSepolia.id]: arbitrumSepolia,
};

export const DEFAULT_CHAIN: Chain = mainnet;

export enum SUPPORTED_CHAIN_IDS {
  ETHEREUM = mainnet.id,
  POLYGON = polygon.id,
  ARBITRUM = arbitrum.id,
  ETHEREUM_SEPOLIA = sepolia.id,
  POLYGON_AMOY = polygonAmoy.id,
  ARBITRUM_SEPOLIA = arbitrumSepolia.id,
}
