import { createContext } from "react";
import { MagicContextType } from "./MagicContext.interface";

export const MagicContext = createContext<MagicContextType>({
  magic: null,
});
