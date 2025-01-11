import { useMemo } from "react";
import { Button } from "primereact/button";
import { useAccount, useConnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

interface ConnectButtonProps {
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const ConnectButton = ({
  fullWidth = false,
  isLoading = false,
}: ConnectButtonProps) => {
  const { isConnected, isConnecting } = useAccount();
  const { isPending } = useConnect();
  const { openConnectModal } = useConnectModal();

  const isLoadingOrPending = useMemo(() => {
    return isLoading || isPending || isConnecting;
  }, [isPending, isLoading, isConnecting]);

  return (
    <>
      <Button
        label={isLoadingOrPending ? "Connecting" : "Connect"}
        loading={isLoadingOrPending && !isConnected}
        onClick={openConnectModal}
        className={`w-full ${fullWidth ? "" : "md:w-auto"}`}
      />
    </>
  );
};
