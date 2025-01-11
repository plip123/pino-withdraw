import { useMemo, useState } from "react";
import { Toolbar } from "primereact/toolbar";
import { Image } from "primereact/image";
import { isMobile } from "react-device-detect";
import { Sidebar } from "primereact/sidebar";
import { EndHeaderContent } from "./EndHeaderContent";

export const HeaderLayout = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const StartContent = useMemo(
    () => (
      <div className="flex align-items-center gap-2">
        <Image src="/images/logo.svg" alt="Pino" width="60" />
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
    <div
      className="w-full absolute md:relative top-0 left-0 z-10 md:bg-transparent"
      style={{ backgroundColor: "#4CD7D5" }}
    >
      <Toolbar
        start={StartContent}
        end={EndContent}
        className="border-none bg-transparent py-2 md:py-4"
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
  );
};
