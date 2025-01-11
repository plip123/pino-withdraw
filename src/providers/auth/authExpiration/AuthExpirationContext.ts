import { createContext } from "react";
import { AuthExpirationProps } from "./AuthExpirationContext.interface";

const authExpirationDefaultValues: AuthExpirationProps = {
  isLoading: false,
  openLogoutAlert: () => {},
};

export const AuthExpirationContext = createContext<AuthExpirationProps>(
  authExpirationDefaultValues,
);
