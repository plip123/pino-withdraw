import { ConnectButton } from "@/features/auth";
import { TransferCard } from "@/features/transfer";
import { useAccount } from "wagmi";

export const Hero = () => {
  const { isConnected } = useAccount();

  return (
    <div className="grid grid-nogutter text-800 mt-8">
      <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
        <section>
          <span className="block text-6xl font-bold mb-1">
            Now you can withdraw
          </span>
          <div className="text-6xl text-primary font-bold mb-3">
            your blocked assets
          </div>
          <p className="mt-0 mb-4 text-700 line-height-3">
            Connect your wallet to start transferring tokens. This page allows
            you to withdraw USDT funds held in your wallet.
          </p>
          {!isConnected && <ConnectButton />}
        </section>
      </div>
      <div className="col-12 md:col-6 overflow-hidden py-8 pr-4">
        <TransferCard />
      </div>
    </div>
  );
};
