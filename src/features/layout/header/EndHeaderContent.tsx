import { ConnectButton } from "@/features/auth";
import { AnimatedButton, ChainSelector } from "@/components";
import { Button } from "primereact/button";
import { useAccount, useDisconnect } from "wagmi";
import { useSmartWallet } from "@/hooks";

export const EndHeaderContent = () => {
  const { isConnected, isConnecting } = useAccount();
  const { logout } = useSmartWallet();
  const { isPending: isDisconnecting } = useDisconnect();

  return (
    <div className="flex flex-column md:flex-row align-items-center justify-content-between h-full pt-2 md:pt-0">
      <div className="flex gap-4 mr-4">
        <AnimatedButton label="$R2R Token" href="https://r2rtoken.com/" />
        <AnimatedButton label="$R2R DeFi" href="https://r2rdefi.com/" />
      </div>
      {isConnected ? (
        <div className="flex flex-wrap md:flex-nowrap mt-4 md:mt-0 gap-4 justify-content-center h-full">
          <ChainSelector />
          <Button
            label="Disconnect"
            className="w-full mt-auto md:mt-0"
            loading={isDisconnecting && isConnected}
            onClick={logout}
          />
        </div>
      ) : (
        <ConnectButton isLoading={isConnecting} />
      )}
    </div>
  );
};
