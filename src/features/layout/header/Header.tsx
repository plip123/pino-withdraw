import { useEffect, useMemo, useRef, useState } from "react";
import { Toolbar } from "primereact/toolbar";
import { Image } from "primereact/image";
import { isMobile } from "react-device-detect";
import { Sidebar } from "primereact/sidebar";
import { EndHeaderContent } from "./EndHeaderContent";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import BgAnimated from "../../../assets/animations/bg.json";

export const HeaderLayout = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (!lottieRef.current) return;
    lottieRef.current.setSpeed(2);
  }, []);

  const StartContent = useMemo(
    () => (
      <div className="flex align-items-center gap-2">
        <Image src="/images/logo.png" alt="Pino" width="70" />
      </div>
    ),
    [],
  );

  const EndContent = useMemo(() => {
    if (isMobile)
      return (
        <i
          className="pi pi-bars text-white"
          style={{ fontSize: "25px" }}
          onClick={() => setOpenMobileMenu(true)}
        />
      );
    return <EndHeaderContent />;
  }, []);

  return (
    <>
      <Lottie
        lottieRef={lottieRef}
        animationData={BgAnimated}
        style={{
          position: "absolute",
          top: "0",
          zIndex: "-1",
          right: "0",
          opacity: "0.8",
        }}
      />
      <div className="w-full">
        <Toolbar
          start={StartContent}
          end={EndContent}
          className="border-none bg-transparent"
        />
        <Sidebar
          visible={openMobileMenu}
          header={StartContent}
          onHide={() => setOpenMobileMenu(false)}
          className="md:hidden"
          fullScreen
        >
          <EndHeaderContent />
        </Sidebar>
      </div>
    </>
  );
};
