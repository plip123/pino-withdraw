import {
  BASIC_TRANSFER_TOKEN_FUNCTIONS,
  DEFAULT_CHAIN,
  USDT_DATA,
} from "@/constants";
import { useGetTokens } from "@/hooks";
import { IToken } from "@/interfaces";
import { useNotificationProvider } from "@/providers";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { useMemo, useState } from "react";
import { getAddress, parseAbi, zeroAddress } from "viem";
import { useAccount, useWriteContract } from "wagmi";

export const useTransferForm = () => {
  const notification = useNotificationProvider();
  const [toAddress, setToAddress] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [amountError, setAmountError] = useState<string>("");
  const { chainId, address = zeroAddress } = useAccount();
  const { data: tokenBalances } = useGetTokens({
    chainId: chainId ?? DEFAULT_CHAIN.id,
    address,
    tokenAddr: USDT_DATA[chainId ?? DEFAULT_CHAIN.id].contractAddress,
    enabled: address !== zeroAddress,
  });
  const {
    data: txHash,
    isPending: isLoading,
    isError,
    isSuccess,
    reset,
    writeContract,
  } = useWriteContract();

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
      const parseAmount = ethers.parseUnits(amount, token.decimals);
      writeContract({
        address: token.contractAddress,
        abi: parseAbi(BASIC_TRANSFER_TOKEN_FUNCTIONS),
        functionName: "transfer",
        args: [getAddress(toAddress), parseAmount],
      });
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

  const cleanTransferData = () => {
    console.log("isSuccess", isSuccess);
    setToAddress("");
    setAmount("0");
    setAddressError("");
    setAmountError("");
    reset();
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
    handleAddress,
    handleAmount,
    handleTransfer,
  };
};
