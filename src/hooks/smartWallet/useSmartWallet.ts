import { WalletProviderContext } from "@/providers";
import { useContext } from "react";

export const useSmartWallet = () => useContext(WalletProviderContext);
