import { Address } from 'viem';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface AuthStore {
  isLoggedIn: boolean;
  eoaAddress?: Address;
  logIn: (eoaAddress: Address) => void;
  logOut: () => void;
};

export const useAuthStore = create(
  devtools(
    persist<AuthStore>(
      (set) => ({
          isLoggedIn: false,
          eoaAddress: undefined,
          logIn: (eoaAddress: Address) => set({ eoaAddress }),
          logOut: () => set({ isLoggedIn: false }),
      }),
      { name: 'r2rwithdraw-auth' }
    )
  )
);
