import { useMemo } from "react";
import { TransferForm } from "./TransferForm";
import { DEFAULT_CHAIN, USDT_DATA } from "@/constants";
import { useAccount } from "wagmi";
import { TokenRow } from "@/components";
import { useGetTokens, useSmartWallet } from "@/hooks";
import { zeroAddress } from "viem";
import { IToken } from "@/interfaces";
import BigNumber from "bignumber.js";
import { Card } from "primereact/card";

export const TransferCard = () => {
  const { chainId } = useAccount();
  const { smartAccountAddress: address = zeroAddress } = useSmartWallet();
  const { data: tokenBalances } = useGetTokens({
    chainId: chainId ?? DEFAULT_CHAIN.id,
    address,
    tokenAddr: USDT_DATA[chainId ?? DEFAULT_CHAIN.id].contractAddress,
    enabled: true,
  });

  const token: IToken = useMemo(() => {
    const usdtToken = USDT_DATA[chainId ?? DEFAULT_CHAIN.id];
    const tokenBalance =
      tokenBalances?.find(
        (t) => t?.contractAddress === usdtToken.contractAddress,
      )?.tokenBalance ?? "0";
    return {
      ...usdtToken,
      tokenBalance: new BigNumber(tokenBalance)
        .shiftedBy(-usdtToken.decimals)
        .toFixed(usdtToken.decimals),
    };
  }, [chainId, tokenBalances]);

  return (
    <Card
      pt={{
        root: {
          style: {
            borderRadius: "12px",
          },
        }
      }}
    >
      <TokenRow token={token} className="mb-4" />
      <TransferForm />
    </Card>
  );
};
