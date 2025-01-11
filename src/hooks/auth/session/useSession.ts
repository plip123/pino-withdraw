import { useCallback, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useNotificationProvider } from "@/providers";
import { env } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { TIMEOUT_SESSION_KEY } from "@/constants";

export const useSession = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const notification = useNotificationProvider();
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const logout = useCallback(async () => {
    if (!isConnected) return;
    try {
      setIsLoading(true);
      localStorage.removeItem(env.VITE_LOCALE_TOKEN_NAME);
      localStorage.removeItem(TIMEOUT_SESSION_KEY);
      queryClient.clear();
      await disconnectAsync();
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
    notification,
    queryClient,
  ]);

  return {
    logout,
    isLoading,
  };
};
