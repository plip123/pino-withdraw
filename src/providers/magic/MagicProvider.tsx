import { Magic } from "magic-sdk";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { MagicContext } from "./MagicContext";

export const MagicProvider = ({ children }: { children: ReactNode }) => {
  const [magic, setMagic] = useState<Magic | null>(null);
  useEffect(() => {
    if (import.meta.env.VITE_MAGIC_API_KEY) {
      const magic = new Magic(import.meta.env.VITE_MAGIC_API_KEY, {
        locale: "es",
      });
      setMagic(magic);
    }
  }, []);

  const value = useMemo(() => {
    return {
      magic,
    };
  }, [magic]);

  return (
    <MagicContext.Provider value={value}>{children}</MagicContext.Provider>
  );
};
