import { ReactNode, useState } from "react";
import { LogoutAlertProviderContext } from "./LogoutAlertContext";
import { useSession } from "@/hooks";

export const LogoutAlertProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState<boolean>(false);
  const { logout } = useSession();

  const openLogoutAlert = () => {
    if (isLoading || isLogoutAlertOpen) return;
    setIsLogoutAlertOpen(true);
    setIsLoading(true);
    logout();
  };

  const closeLogoutAlert = () => {
    if (isLoading || !isLogoutAlertOpen) return;
    setIsLogoutAlertOpen(false);
  };

  return (
    <LogoutAlertProviderContext.Provider
      value={{
        isLoading,
        openLogoutAlert,
        closeLogoutAlert,
      }}
    >
      {children}
    </LogoutAlertProviderContext.Provider>
  );
};
