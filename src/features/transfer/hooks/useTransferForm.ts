import { DEFAULT_CHAIN, USDT_DATA } from "@/constants";
import { useGetTokens, usePimlico, useSmartWallet } from "@/hooks";
import { IToken } from "@/interfaces";
import { useNotificationProvider } from "@/providers";
import { buildErc20TransferTransaction } from "@/utils";
import BigNumber from "bignumber.js";
import { useMemo, useState } from "react";
import { getAddress, zeroAddress } from "viem";
import { useAccount } from "wagmi";

export const useTransferForm = () => {
  const notification = useNotificationProvider();
  const [toAddress, setToAddress] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [amountError, setAmountError] = useState<string>("");
  const { chainId } = useAccount();
  const { smartAccountAddress: address = zeroAddress } = useSmartWallet();
  const { getSmartAccountClient, publicClient } = usePimlico();
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
      tokenBalance: new BigNumber(tokenBalance).toString(),
    };
  }, [chainId, tokenBalances]);

  const canTransfer = useMemo(() => {
    return (
      !addressError && !amountError && !!toAddress && !!amount && amount !== "0"
    );
  }, [addressError, amount, amountError, toAddress]);

  const handleAddress = (value: string) => {
    try {
      getAddress(value);
      setAddressError("");
    } catch {
      setAddressError("Invalid address");
    } finally {
      setToAddress(value);
    }
  };

  const handleAmount = (value: string = "0") => {
    setAmount(value);

    const bnValue = new BigNumber(value).shiftedBy(6);

    if (!value || parseFloat(value) === 0) {
      setAmountError("Invalid amount");
    } else if (bnValue.gt(BigNumber(token.tokenBalance))) {
      setAmountError("Insufficient balance to transfer");
    } else {
      setAmountError("");
    }
  };

  const handleTransfer = async () => {
    if (!canTransfer) {
      if (notification?.show) {
        notification.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to transfer",
        });
      }
      return;
    }

    try {
      console.log("Transfer", toAddress, amount);
      const smartAccountClient = await getSmartAccountClient();
      const txHash = await smartAccountClient?.sendTransactions({
        account: smartAccountClient.account,
        transactions: [
          buildErc20TransferTransaction(
            getAddress(toAddress),
            token.contractAddress,
            amount,
            token.decimals,
          ),
        ],
      });
      const receipt = await publicClient?.waitForTransactionReceipt({
        hash: txHash as `0x${string}`,
      });
      console.log("Receipt", receipt);
    } catch (error) {
      console.error("Error transferring", error);
      if (notification?.show) {
        notification.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to transfer",
        });
      }
    }
  };

  return {
    toAddress,
    addressError,
    amount,
    amountError,
    canTransfer,
    setAmount,
    handleAddress,
    handleAmount,
    handleTransfer,
  };
};
