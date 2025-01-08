import { arbitrum, bsc, mainnet, polygon, polygonAmoy, sepolia } from "wagmi/chains";
import { DEFAULT_CHAIN, SUPPORTED_CHAINS, USDT_ADDRESSES } from "@/constants";

export const getChainIcon = (chainId: number) => {
  switch (chainId) {
    case mainnet.id:
    case sepolia.id:
      return "ethereum";
    case polygon.id:
    case polygonAmoy.id:
      return "polygon";
    case bsc.id:
      return "binance";
    case arbitrum.id:
      return "arbitrum";
    default:
      return "logo";
  }
};

export const getChainById = (chainId: number) => {
  return (
    Object.values(SUPPORTED_CHAINS).find((chain) => chain.id === chainId) ??
    DEFAULT_CHAIN
  );
};

export const getSupportedChainIds = () => {
  return Object.values(SUPPORTED_CHAINS).map((chain) => chain.id);
};

export const getUSDTAddressByChainId = (chainId: number) => {
  return USDT_ADDRESSES[chainId];
};
