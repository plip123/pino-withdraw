import { env } from "@/utils";
import {
  bsc,
  Chain,
  mainnet,
  polygon,
  polygonAmoy,
  sepolia,
} from "wagmi/chains";

export const CUSTOM_RPC_BY_CHAIN = {
  [mainnet.id]: `https://mainnet.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`,
  [polygon.id]: `https://polygon-mainnet.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`,
  [bsc.id]: `https://bnb-mainnet.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`,
};

export const CHAIN_SHORT_NAME: Record<SUPPORTED_CHAIN_IDS, string> = {
  [polygon.id]: "pol",
  [mainnet.id]: "eth",
  [bsc.id]: "bsc",
};

export const SUPPORTED_CHAINS: Record<SUPPORTED_CHAIN_IDS, Chain> = {
  [mainnet.id]: mainnet,
  [polygon.id]: polygon,
  [bsc.id]: bsc,
};

export const DEFAULT_CHAIN = polygon;

export enum SUPPORTED_CHAIN_IDS {
  ETHEREUM = mainnet.id,
  ETHEREUM_SEPOLIA = sepolia.id,
  POLYGON = polygon.id,
  POLYGON_AMOY = polygonAmoy.id,
  BSC = bsc.id,
}
