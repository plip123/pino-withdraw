import { Address } from "viem";

export interface AuthStore {
  isLoggedIn: boolean;
  eoaAddress?: Address;
  logIn: (eoaAddress: Address) => void;
  logOut: () => void;
}
