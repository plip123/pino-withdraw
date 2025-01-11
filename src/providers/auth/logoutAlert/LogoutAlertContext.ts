import { createContext } from "react";
import { LogoutAlertProps } from "./LogoutAlertContext.interface";

const logoutAlertDefaultValues: LogoutAlertProps = {
  isLoading: false,
  openLogoutAlert: () => {},
  closeLogoutAlert: () => {},
};

export const LogoutAlertProviderContext = createContext<LogoutAlertProps>(
  logoutAlertDefaultValues,
);
