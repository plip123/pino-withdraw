import BigNumber from "bignumber.js";
import { Avatar } from "primereact/avatar";
import { useMemo } from "react";
import { ITokenRow } from "./TokenRow.interface";
import { useAccount } from "wagmi";

export const TokenRow = ({ token, className }: ITokenRow) => {
  const { chain } = useAccount();
  const tokenBalance = useMemo(() => {
    return BigNumber(token.tokenBalance).toString(10);
  }, [token]);

  return (
    <div
      className={`flex align-items-center justify-content-between ${className}`}
    >
      <div className="flex gap-2 align-items-center">
        <Avatar
          label={token.symbol?.[0] ?? "T"}
          image="/images/usdt.svg"
          size="xlarge"
          shape="circle"
        />
        <div className="flex flex-column text-left">
          <span>{token.symbol}</span>
          <small>{token.name}</small>
          {!!chain && (
            <small className="text-orange-400">
              {chain.testnet ? "Testnet" : "Mainnet"}
            </small>
          )}
        </div>
      </div>

      <div className="flex flex-column align-items-end font-bold">
        <span>
          {tokenBalance} {token.symbol}
        </span>
        <small>Available</small>
      </div>
    </div>
  );
};
