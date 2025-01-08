import { Address } from "viem";
import { SUPPORTED_CHAIN_IDS } from "./chain";

export const USDT_ADDRESSES: Record<SUPPORTED_CHAIN_IDS, Address> = {
  [SUPPORTED_CHAIN_IDS.ETHEREUM]: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  [SUPPORTED_CHAIN_IDS.POLYGON]: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  [SUPPORTED_CHAIN_IDS.BSC]: "0x55d398326f99059ff775485246999027b3197955",
  [SUPPORTED_CHAIN_IDS.ARBITRUM]: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
};

export const USDT_DATA = {
  [SUPPORTED_CHAIN_IDS.ETHEREUM]: {
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    contractAddress: USDT_ADDRESSES[SUPPORTED_CHAIN_IDS.ETHEREUM],
  },
  [SUPPORTED_CHAIN_IDS.POLYGON]: {
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    contractAddress: USDT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON],
  },
  [SUPPORTED_CHAIN_IDS.BSC]: {
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    contractAddress: USDT_ADDRESSES[SUPPORTED_CHAIN_IDS.BSC],
  },
  [SUPPORTED_CHAIN_IDS.ARBITRUM]: {
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    contractAddress: USDT_ADDRESSES[SUPPORTED_CHAIN_IDS.ETHEREUM],
  },
};

export const BASIC_TRANSFER_TOKEN_FUNCTIONS = [
  "function approve(address,uint)",
  "function transfer(address to, uint256 amount) external returns (bool)",
] as const;
