import { SUPPORTED_CHAIN_IDS } from "@/constants";

export interface IChainSelector {
  newChainId?: SUPPORTED_CHAIN_IDS;
  size?: "normal" | "large" | "xlarge";
  fullWidth?: boolean;
  onChange?: (value?: SUPPORTED_CHAIN_IDS) => void;
}