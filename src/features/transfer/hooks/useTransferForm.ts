import { useNotificationProvider } from "@/providers";
import BigNumber from "bignumber.js";
import { useState } from "react";
import { getAddress } from "viem";

export const useTransferForm = () => {
  const notification = useNotificationProvider();
  const [toAddress, setToAddress] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");

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
    } else if (bnValue.gt(BigNumber(0))) {
      // TODO: check balance
      setAmountError("Insufficient balance to transfer");
    } else {
      setAmountError("");
    }
  };

  const handleTransfer = () => {
    if (!toAddress || !amount || addressError || amountError) {
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
    setAmount,
    handleAddress,
    handleAmount,
    handleTransfer,
  };
};
