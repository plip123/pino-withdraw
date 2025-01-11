import { CHAIN_NAME_FOR_ALCHEMY, SUPPORTED_CHAIN_IDS } from "@/constants";
import { env } from "@/utils";
import axios from "axios";
import { Address } from "viem";
import { GetTokensResponse } from "./GetTokens.interface";

const JSONRPC = "2.0";
const CONTENT_TYPE = "application/json";

export const getTokens = async (
  chainId: SUPPORTED_CHAIN_IDS,
  address: Address,
  tokenAddr: Address,
) => {
  const baseURL = `https://${CHAIN_NAME_FOR_ALCHEMY[chainId]}.g.alchemy.com/v2/${env.VITE_ALCHEMY_KEY}`;

  const data = JSON.stringify({
    jsonrpc: JSONRPC,
    method: "alchemy_getTokenBalances",
    params: [`${address}`, [`${tokenAddr}`]],
    id: 1,
  });

  const config = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": CONTENT_TYPE,
    },
    data: data,
  };
  const response = await axios(config);
  return response.data as GetTokensResponse;
};
