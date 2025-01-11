import { ConnectButton } from "@/features/auth";
import { TransferCard } from "@/features/transfer";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import BgTopAnimated from "../../../assets/animations/bg-top.json";
import BgBottomAnimated from "../../../assets/animations/bg-bottom.json";
import { isMobile } from "react-device-detect";

export const Hero = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!lottieRef.current) return;
    lottieRef.current.setSpeed(2);
  }, []);

  return (
    <>
      <Lottie
        lottieRef={lottieRef}
        animationData={BgTopAnimated}
        style={{
          position: "absolute",
          top: "0",
          zIndex: "-1",
          right: "0",
          opacity: "0.8",
          width: isMobile ? "750px" : "1000px",
        }}
      />
      <div className="grid grid-nogutter text-800 mt-8">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
          <section>
            <span className="block text-6xl font-bold mb-1">
              Now you can withdraw
            </span>
            <div className="text-6xl text-primary font-bold mb-3">
              your own USDT tokens
            </div>
            <p className="mt-0 mb-4 text-700 line-height-3">
              <i className="pi pi-exclamation-triangle text-orange-500 text-lg mr-1" />
              <span>
                This page is for portfolio purposes only, the transfer is real so you should be careful where you send your assets.
              </span>
            </p>
            {!isConnected && <ConnectButton />}
          </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden py-8 pr-4 pl-4 md:pl-0 h-screen md:h-auto flex md:block align-items-center justify-content-center">
          <TransferCard />
        </div>
      </div>
    <Lottie
        lottieRef={lottieRef}
        animationData={BgBottomAnimated}
        style={{
          position: "absolute",
          bottom: "0",
          zIndex: "-1",
          left: "0",
          opacity: "0.8",
          width: "800px",
          display: isMobile ? "none" : undefined,
        }}
      />
    </>
  );
};
