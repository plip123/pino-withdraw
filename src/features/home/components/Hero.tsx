import { ConnectButton } from "@/features/auth";
import { TransferCard } from "@/features/transfer";
import { BlockUI } from "primereact/blockui";
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {!isConnected && <ConnectButton />}
        </section>
      </div>
      <div className="col-12 md:col-6 overflow-hidden py-8 pr-8">
        <BlockUI
          blocked={!isConnected}
          template={
            <div className="relative text-center text-white font-bold flex flex-column gap-2">
              <i className="pi pi-lock" style={{ fontSize: '3rem' }} />
              <p>Please connect your wallet to enable the transfer. </p>
              <ConnectButton />
            </div>
          }
          pt={{
            mask: {
              style: {
                background:
                  "radial-gradient(circle, rgba(33,33,33,0.6) 50%, rgba(29,29,29,0.5) 100%)",
              },
            },            
          }}
        >
          <TransferCard />
        </BlockUI>
      </div>
    </div>
  );
};
