import { Address } from "viem";

type TShortenAddress = (
  address?: Address | string | null,
  chars?: number,
) => string;

export const shortenAddress: TShortenAddress = (address, chars = 5) => {
  if (address) {
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  } else {
    return "";
  }
};
