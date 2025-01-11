import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_CHAIN,
  SUPPORTED_CHAIN_IDS,
  SUPPORTED_CHAINS,
} from "@/constants";
import type { IChainSelector } from "./ChainSelector.interface";
import { getChainById, getChainIcon, shortenAddress } from "@/utils";
import { useNotificationProvider } from "@/providers";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { useAccount, useSwitchChain } from "wagmi";
import { zeroAddress } from "viem";

export const ChainSelector = ({
  newChainId,
  size = "normal",
  fullWidth = false,
  onChange,
}: IChainSelector) => {
  const { chainId, address, isConnecting } = useAccount();
  const { switchChain, isPending } = useSwitchChain();
  const [selectedChain, setSelectedChain] = useState<SUPPORTED_CHAIN_IDS>(
    newChainId || chainId || DEFAULT_CHAIN.id,
  );
  const notification = useNotificationProvider();

  useEffect(() => {
    if (!chainId) {
      setSelectedChain(newChainId ?? DEFAULT_CHAIN.id);
      return;
    }

    setSelectedChain(newChainId ?? chainId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  const handleChainChange = async (id: SUPPORTED_CHAIN_IDS) => {
    try {
      await switchChain({ chainId: id });
      if (notification?.show) {
        const chainName = getChainById(id).name;
        notification.show({
          severity: "success",
          summary: "Success",
          detail: "Switched to " + chainName,
        });
      }
      if (onChange) onChange(id);
    } catch (error) {
      console.error("Error switching network", error);
      if (notification?.show) {
        notification.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to switch network",
        });
      }
    }
    setSelectedChain(id);
  };

  const chainValueTemplate = () => {
    if (address === zeroAddress)
      return <i className="pi pi-spin pi-spinner-dotted" />;

    const shortAddress = shortenAddress(address);
    return (
      <div className="flex h-full align-items-center gap-4">
        {isPending ||
          (isConnecting && <i className="pi pi-spin pi-spinner-dotted" />)}
        <span>{shortAddress}</span>
      </div>
    );
  };

  const chainOptionTemplate = (id: SUPPORTED_CHAIN_IDS) => {
    const icon = getChainIcon(id);
    const { name } = getChainById(id);
    return (
      <div className="flex h-full align-items-center gap-4">
        <Image src={`/images/${icon}.svg`} alt="chain-icon" width="25" />
        <span>{name}</span>
      </div>
    );
  };

  const currentChainLogo = useMemo(() => {
    return getChainIcon(selectedChain);
  }, [selectedChain]);

  const finalSizeClassName = useMemo(() => {
    switch (size) {
      case "normal":
        return "h-3rem";
      case "large":
        return "h-4rem";
      case "xlarge":
        return "h-5rem";
      default:
        return "h-3rem";
    }
  }, [size]);

  const finalFullWidthClassName = useMemo(() => {
    return fullWidth ? "w-full" : "w-full md:w-60";
  }, [fullWidth]);

  const finalChainSelectorClassName = useMemo(() => {
    return [finalSizeClassName, finalFullWidthClassName].join(" ");
  }, [finalSizeClassName, finalFullWidthClassName]);

  return (
    <Dropdown
      value={selectedChain}
      options={Object.values(SUPPORTED_CHAINS).map((chain) => chain.id)}
      dropdownIcon={
        <Image
          src={`/images/${currentChainLogo}.svg`}
          pt={{ root: { style: { display: "flex", alignItems: "center" } } }}
          alt="chain-icon"
          width="25"
        />
      }
      placeholder={"Select Chain"}
      onChange={(e) => handleChainChange(e.value)}
      valueTemplate={chainValueTemplate}
      itemTemplate={chainOptionTemplate}
      className={finalChainSelectorClassName}
      autoOptionFocus
    />
  );
};
