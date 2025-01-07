import { useQuery } from "@tanstack/react-query";
import { IGetToken } from "./Tokens.interface";
import { getTokens } from "@/services";

export const useGetTokens = ({ chainId, address, tokenAddr, enabled }: IGetToken) => {
  return useQuery({
    queryKey: ["getTokens", chainId, address, tokenAddr],
    queryFn: async () => {
      const tokensResponse = await getTokens(chainId, address, tokenAddr);
      return tokensResponse.result.tokenBalances;
    },
    enabled: enabled,
  });
};