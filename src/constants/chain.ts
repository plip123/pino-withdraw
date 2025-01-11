import {
  arbitrum,
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
};

export const CHAIN_SHORT_NAME: Record<SUPPORTED_CHAIN_IDS, string> = {
  [mainnet.id]: "eth",
  [polygon.id]: "pol",
  [arbitrum.id]: "arb",
};

export const CHAIN_NAME_FOR_ALCHEMY: Record<SUPPORTED_CHAIN_IDS, string> = {
  [mainnet.id]: "eth",
  [polygon.id]: "polygon",
  [arbitrum.id]: "arb",
};

export const SUPPORTED_CHAINS: Record<SUPPORTED_CHAIN_IDS, Chain> = {
  [mainnet.id]: mainnet,
  [polygon.id]: polygon,
  [arbitrum.id]: arbitrum,
};

export const DEFAULT_CHAIN: Chain = mainnet;

export enum SUPPORTED_CHAIN_IDS {
  ETHEREUM = mainnet.id,
  ETHEREUM_SEPOLIA = sepolia.id,
  POLYGON = polygon.id,
  POLYGON_AMOY = polygonAmoy.id,
  ARBITRUM = arbitrum.id,
}
