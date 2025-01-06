import { createContext } from 'react';
import { TSmartWalletContextValues } from './SmartWalletContext.interface';

const defaultValues: TSmartWalletContextValues = {
  smartAccountAddress: undefined,
  isLoadingSafeWallet: false,
  getSmartAccountClient: () => {},
  setSmartAccountAddress: () => {},
}

export const WalletProviderContext = createContext<TSmartWalletContextValues>(defaultValues);
