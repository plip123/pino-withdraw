import { useState } from "react";
import { CreateConnectorFn, useAccount, useConnect, useSwitchChain as useSwitchChainWagmi } from "wagmi";
import { DEFAULT_CHAIN } from "@/constants";
import { getChainById, getMagicConnectorFn } from "@/utils";

export const useSwitchChain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { chain, connector } = useAccount();
  const { connectAsync, isError: isConnectError, error: connectError, isSuccess: isConnectSuccess} = useConnect();
  const { switchChainAsync, isError: isSwitchError, error: switchError, isSuccess: isSwitchSuccess } = useSwitchChainWagmi();
  
  const switchChain = async (chainId: number = DEFAULT_CHAIN.id) => {
    if (chain && chain.id === chainId) return;
    try {
      setIsLoading(true);
      if (connector?.id.includes('magic')) {
        const newChain = getChainById(chainId);
        const magicConnector = getMagicConnectorFn(`magic-${chainId}`, `Magic ${newChain.name}`, chainId) as CreateConnectorFn;
        if (magicConnector) {
          await connectAsync({ chainId, connector: magicConnector });
        } else {
          throw new Error("Magic connector not found");
        }
      } else {
        await switchChainAsync({ chainId });
      }
    } catch (error) {
      console.error("Error switching network", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading: isLoading,
    isError: isConnectError || isSwitchError,
    error: connectError || switchError,
    isSuccess: isConnectSuccess || isSwitchSuccess,
    switchChain,
  };
};