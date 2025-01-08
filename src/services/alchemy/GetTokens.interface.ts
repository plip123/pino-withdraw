import { Address } from "viem";

export interface GenericResponse {
  jsonrpc: string;
  id: number;
}

export interface TokenBalance {
  contractAddress: Address;
  tokenBalance: string;
}

export interface GetTokensResponse extends GenericResponse {
  result: {
    address: string;
    tokenBalances: TokenBalance[];
  };
}
