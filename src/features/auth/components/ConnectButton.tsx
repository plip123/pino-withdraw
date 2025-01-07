import { Button } from "primereact/button";
import { useAccount, useConnect } from "wagmi";

export const ConnectButton = () => {
  const { isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();

  return (
    <Button
      label={isPending ? "Connecting" : "Connect"}
      loading={isPending && !isConnected}
      onClick={() => connect({ connector: connectors[0] })}
    />
  );
};
