import { Dispatch, SetStateAction } from "react";
import { Address } from "viem";

export type TSmartWalletContextValues = {
  smartAccountAddress?: Address;
  isLoadingSafeWallet: boolean;
  getSmartAccountClient: () => void;
  setSmartAccountAddress: Dispatch<SetStateAction<Address | undefined>>;
  logout: () => void;
};
