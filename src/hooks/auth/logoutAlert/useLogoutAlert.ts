import { useContext } from "react";
import { LogoutAlertProviderContext } from "@/providers";

export const useLogoutAlert = () => useContext(LogoutAlertProviderContext);
