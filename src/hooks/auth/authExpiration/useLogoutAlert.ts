import { useContext } from "react";
import { AuthExpirationContext } from "@/providers";

export const useLogoutAlert = () => useContext(AuthExpirationContext);
