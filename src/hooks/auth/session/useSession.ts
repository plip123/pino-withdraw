import { useCallback, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useAuthStore } from "@/store";
import { useNotificationProvider } from "@/providers";
import { env } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { TIMEOUT_SESSION_KEY } from "@/constants";

export const useSession = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const notification = useNotificationProvider();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logOut = useAuthStore((state) => state.logOut);
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const logout = useCallback(async () => {
    if (!isLoggedIn || !isConnected) return;
    try {
      setIsLoading(true);
      localStorage.removeItem(env.VITE_LOCALE_TOKEN_NAME);
      localStorage.removeItem(TIMEOUT_SESSION_KEY);
      logOut();
      queryClient.clear();
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
    } finally {
      setIsLoading(false);
    }
  }, [
    disconnectAsync,
    isConnected,
    isLoggedIn,
    logOut,
    notification,
    queryClient,
  ]);

  return {
    logout,
    isLoading,
  };
};
