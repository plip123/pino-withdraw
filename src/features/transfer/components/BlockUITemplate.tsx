import { IToken } from "@/interfaces";
import { shortenAddress } from "@/utils";
import { Button } from "primereact/button";
import { useMemo } from "react";
import { useAccount } from "wagmi";

interface IBlockUITemplate {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  token?: IToken;
  toAddress?: string;
  amount?: string;
  txHash?: string;
  onClick?: () => void;
}

export const BlockUITemplate = ({
  isLoading,
  token,
  amount,
  toAddress,
  txHash,
  isSuccess,
  isError,
  onClick,
}: IBlockUITemplate) => {
  const { chain } = useAccount();

  const shortToAddress = useMemo(() => {
    return shortenAddress(toAddress);
  }, [toAddress]);

  return (
    <div>
      {isLoading && (
        <div className="text-center text-white font-bold">
          <i
            className="pi pi-spin pi-spinner-dotted"
            style={{ fontSize: "50px" }}
          />
          <p>
            Transferring {amount} {token?.symbol} to {shortToAddress}
          </p>
        </div>
      )}
      {isSuccess && (
        <div className="text-center font-bold">
          <i
            className="pi pi-verified text-green-300"
            style={{ fontSize: "50px" }}
          />
          <p className="text-white">
            Transfer {amount} {token?.symbol} to {shortToAddress} successfully!
          </p>
          <Button
            label={`View on ${chain?.blockExplorers?.default.name}`}
            severity="success"
            onClick={() => {
              window.open(
                `${chain?.blockExplorers?.default.url}/tx/${txHash}`,
                "_blank",
              );
              onClick?.();
            }}
          />
        </div>
      )}
      {isError && (
        <div className="text-center font-bold">
          <i
            className="pi pi-times-circle text-red-400"
            style={{ fontSize: "50px" }}
          />
          <p className="text-white">
            Transfer {amount} {token?.symbol} to {shortToAddress} has failed!
          </p>
          <Button
            label={`View on ${chain?.blockExplorers?.default.name}`}
            severity="danger"
            onClick={() => {
              window.open(
                `${chain?.blockExplorers?.default.url}/tx/${txHash}`,
                "_blank",
              );
              onClick?.();
            }}
          />
        </div>
      )}
    </div>
  );
};
