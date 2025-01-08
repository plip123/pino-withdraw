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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [toAddress, setToAddress] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [amountError, setAmountError] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
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

    const bnValue = new BigNumber(value).shiftedBy(token.decimals ?? 18);

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
      setIsLoading(true);
      const smartAccountClient = await getSmartAccountClient();
      if (!smartAccountClient) throw new Error("SmartAccountClient not found");

      const hash = await smartAccountClient?.sendTransactions({
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
        hash: hash as `0x${string}`,
      });
      setTxHash(receipt?.transactionHash ?? "");

      if (receipt?.status === "success") {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Error transferring", error);
      if (notification?.show) {
        notification.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to transfer",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cleanTransferData = () => {
    setTxHash("");
    setToAddress("");
    setAmount("0");
    setAddressError("");
    setAmountError("");
    setIsSuccess(false);
    setIsError(false);
    setIsLoading(false);
  };

  return {
    toAddress,
    addressError,
    amount,
    amountError,
    token,
    txHash,
    canTransfer,
    isLoading,
    isSuccess,
    isError,
    cleanTransferData,
    setAmount,
    handleAddress,
    handleAmount,
    handleTransfer,
  };
};
