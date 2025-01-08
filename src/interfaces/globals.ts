import { Address } from "viem";

export interface IToken {
  contractAddress: Address;
  tokenBalance: string;
  symbol?: string;
  name?: string;
  decimals?: number;
}
