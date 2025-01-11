import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { env } from "@/utils";
import { useSession } from "@/hooks";
import { TIMEOUT_SESSION_KEY } from "@/constants";

const INACTIVITY_TIMEOUT = 1000 * 60 * Number(env.VITE_SESSION_TIMEOUT);

export const AuthExpirationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTimerRef = useRef(Date.now());
  const { isConnected } = useAccount();
  const { logout } = useSession();

  const isActive = useCallback(() => {
    const lastTimer = localStorage.getItem(TIMEOUT_SESSION_KEY);
    if (!!lastTimer && INACTIVITY_TIMEOUT + Number(lastTimer) < Date.now()) {
      logout();
      return false;
    }
    return true;
  }, [logout]);

  const updateLastTimer = useCallback(() => {
    const dateNow = Date.now();
    if (dateNow - lastTimerRef.current <= 1000) return; // debounce
    localStorage.setItem(TIMEOUT_SESSION_KEY, dateNow.toString());
    lastTimerRef.current = dateNow;
  }, []);

  const resetTemp = useCallback(() => {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(logout, INACTIVITY_TIMEOUT);
  }, [logout]);

  /* Effects */
  useEffect(() => {
    if (!isConnected) {
      if (localStorage.getItem(TIMEOUT_SESSION_KEY))
        localStorage.removeItem(TIMEOUT_SESSION_KEY);
      return;
    }
    if (!isActive()) return;

    const events = [
      "touchstart",
      "keypress",
      "scroll",
      "mousemove",
      "mousedown",
    ];
    events.forEach((event) => {
      window.addEventListener(event, resetTemp);
      window.addEventListener(event, updateLastTimer);
    });

    resetTemp();

    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, resetTemp);
        window.removeEventListener(event, updateLastTimer);
      });
    };
  }, [isConnected, isActive, updateLastTimer, resetTemp]);

  return children;
};
