import { ReactNode, useEffect, useCallback } from "react";
import { usePimlico } from "@/hooks";
import { useAccount, useDisconnect } from "wagmi";
import { useAuthStore } from "@/store";
import { WalletProviderContext } from "./SmartWalletContext";
import { useNotificationProvider } from "../notifications";
import { env } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";

export const SmartWalletProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const notification = useNotificationProvider();
  const eoaAddress = useAuthStore((state) => state.eoaAddress);
  const logOut = useAuthStore((state) => state.logOut);
  const { isConnected, address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const {
    smartAccountAddress,
    isLoadingSafeWallet,
    getSmartAccountClient,
    setSmartAccountAddress,
  } = usePimlico();

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem(env.VITE_LOCALE_TOKEN_NAME);
      localStorage.removeItem("lastActivity");
      logOut();
      setSmartAccountAddress(undefined);
      queryClient.clear();
      await disconnectAsync();
      await disconnectAsync();
      window.location.reload();
    } catch (error) {
      console.error("Error logging out: ", error);
      if (notification?.show) {
        notification.show({
          severity: "error",
          summary: "Error: disconnect",
          detail: "Error logging out, please try again",
        });
      }
    }
  }, [
    disconnectAsync,
    logOut,
    notification,
    queryClient,
    setSmartAccountAddress,
  ]);

  const switchAccountRecursive = useCallback(async () => {
    try {
      if (
        !!eoaAddress &&
        address?.toLowerCase() !== eoaAddress.toLowerCase() &&
        isConnected
      ) {
        if (notification?.show) {
          notification.show({
            severity: "error",
            summary: "Error",
            detail: "Wrong account detected",
          });
        }
        logout();
      }
    } catch (e) {
      console.error(e);
      const timeout = setTimeout(async () => {
        await switchAccountRecursive();
      }, 5000);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, eoaAddress]);

  useEffect(() => {
    switchAccountRecursive();
  }, [switchAccountRecursive]);

  return (
    <WalletProviderContext.Provider
      value={{
        smartAccountAddress,
        isLoadingSafeWallet,
        getSmartAccountClient,
        setSmartAccountAddress,
        logout,
      }}
    >
      {children}
    </WalletProviderContext.Provider>
  );
};
