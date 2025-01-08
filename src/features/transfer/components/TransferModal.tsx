import { useMemo, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { TransferForm } from "./TransferForm";
import { DEFAULT_CHAIN, USDT_DATA } from "@/constants";
import { useAccount } from "wagmi";
import { TokenRow } from "@/components";
import { useGetTokens, useSmartWallet } from "@/hooks";
import { zeroAddress } from "viem";
import { IToken } from "@/interfaces";
import BigNumber from "bignumber.js";

export const TransferModal = () => {
  const { chainId } = useAccount();
  const { smartAccountAddress: address = zeroAddress } = useSmartWallet();
  const [visible, setVisible] = useState<boolean>(false);
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
    <div>
      <Button
        label="Withdraw"
        type="button"
        className="mr-3 p-button-raised"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Withdraw"
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        draggable={false}
      >
        <TokenRow token={token} className="mb-4" />
        <TransferForm />
      </Dialog>
    </div>
  );
};
