import { SUPPORTED_CHAIN_IDS } from "@/constants";
import { Address } from "viem";

export interface IToken {
  contractAddress: Address;
  tokenBalance: string;
}

export interface IGetToken {
  chainId: SUPPORTED_CHAIN_IDS;
  address: Address;
  tokenAddr: Address;
  enabled: boolean;
}
