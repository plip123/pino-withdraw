import { Address } from "viem";

export interface IAddress {
  address: Address;
  type?: "short" | "mid" | "long";
  copyIcon?: boolean;
  className?: string;
}
