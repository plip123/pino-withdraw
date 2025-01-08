import { useMemo } from "react";
import { zeroAddress } from "viem";
import { Toolbar } from "primereact/toolbar";
import { useAccount, useDisconnect } from "wagmi";
import { AddressCopyWidget, ChainSelector } from "@/components";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { useSmartWallet } from "@/hooks";
import { ConnectButton } from "@/features/auth";

export const HeaderLayout = () => {
  const { isConnected } = useAccount();
  const { smartAccountAddress: address } = useSmartWallet();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();

  const StartContent = useMemo(
    () => (
      <div className="hidden align-items-center gap-2 md:flex">
        <Image src="/images/logo.png" alt="R2R" width="80" />
      </div>
    ),
    [],
  );

  const EndContent = useMemo(
    () =>
      isConnected ? (
        <div className="hidden gap-4 md:flex align-items-center">
          <AddressCopyWidget address={address ?? zeroAddress} copyIcon />
          <ChainSelector />
          <Button
            label="Disconnect"
            className="w-full"
            loading={isDisconnecting && isConnected}
            onClick={() => disconnect()}
          />
        </div>
      ) : (
        <ConnectButton />
      ),
    [isConnected, address, isDisconnecting, disconnect],
  );

  return (
    <Toolbar
      start={StartContent}
      end={EndContent}
      className="rounded-none border-0 border-b bg-transparent"
    />
  );
};
