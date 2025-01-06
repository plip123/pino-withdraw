import { useMemo } from "react";
import { MID_SIZE_ADDRESS_LENGTH } from "@/constants";
import type { IAddress } from "./AddressCopyWidget.interface";
import { shortenAddress } from "@/utils";
import { useNotificationProvider } from "@/providers/";

export const AddressCopyWidget = ({
  type = "short",
  address,
  className,
  copyIcon,
}: IAddress) => {
  const toast = useNotificationProvider();

  const onCopy = () => {
    navigator.clipboard.writeText(address);
    if (!toast.show) return;
    toast.show({
      severity: "success",
      summary: "Success",
      detail: "Address copied to clipboard",
    });
  };

  const addressToDisplay = useMemo(() => {
    return type === "short"
      ? shortenAddress(address)
      : type === "mid"
        ? shortenAddress(address, MID_SIZE_ADDRESS_LENGTH)
        : address;
  }, [type, address]);

  return (
    <div
      className={`flex select-none align-items-center justify-center gap-2 ${className}`}
      onClick={copyIcon ? onCopy : undefined}
    >
      {copyIcon && <span className="pi pi-copy cursor-pointer" />}
      <span className="break-all">{addressToDisplay}</span>
    </div>
  );
};
