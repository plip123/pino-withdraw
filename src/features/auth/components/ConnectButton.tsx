import { Button } from "primereact/button";
import { useAccount, useConnect } from "wagmi";
import { OverlayPanel } from "primereact/overlaypanel";
import { useMemo, useRef } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useConnectModal } from "@rainbow-me/rainbowkit";

interface ConnectButtonProps {
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const ConnectButton = ({ fullWidth = false, isLoading = false }: ConnectButtonProps) => {
  const op = useRef<OverlayPanel>(null);
  const { isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { openConnectModal } = useConnectModal();

  const items: MenuItem[] = useMemo(
    () => [
      {
        label: "Social login",
        icon: "pi pi-at",
        command: () => connect({ connector: connectors[0] }),
      },
      {
        label: "Connect wallet",
        icon: "pi pi-wallet",
        command: openConnectModal,
      },
    ],
    [connect, connectors, openConnectModal],
  );

  return (
    <>
      <Button
        label={isPending || isLoading ? "Connecting" : "Connect"}
        loading={(isPending || isLoading) && !isConnected}
        onClick={(e) => op.current?.toggle(e)}
        className={`w-full ${fullWidth ? "" : "md:w-auto"}`}
      />
      <OverlayPanel
        ref={op}
        pt={{
          content: {
            style: { padding: "0" },
          },
        }}
      >
        <Menu model={items} style={{ border: "none" }} />
      </OverlayPanel>
    </>
  );
};
