import { BASIC_TRANSFER_TOKEN_FUNCTIONS } from "@/constants";
import { ethers } from "ethers";
import { Address } from "viem";

export const buildErc20ApproveTransaction = (
  targetAddress: Address,
  tokenAddress: Address,
  amount: string = "0",
) => {
  const contractInterface = new ethers.Interface(
    BASIC_TRANSFER_TOKEN_FUNCTIONS[0],
  );
  const transaction = {
    to: tokenAddress,
    data: contractInterface.encodeFunctionData("approve", [
      targetAddress,
      amount,
    ]),
    value: "0",
    operation: 0,
  };

  return transaction;
};

export const buildErc20TransferTransaction = (
  targetAddress: Address,
  tokenAddress: Address,
  amount: string = "0",
  decimals: number = 18,
) => {
  const contractInterface = new ethers.Interface(
    BASIC_TRANSFER_TOKEN_FUNCTIONS[1],
  );
  const parseAmount = ethers.parseUnits(amount, decimals).toString();
  const transaction = {
    to: tokenAddress,
    data: contractInterface.encodeFunctionData("transfer", [
      targetAddress,
      parseAmount,
    ]) as Address,
    value: 0n,
    operation: 0,
  };

  return transaction;
};
