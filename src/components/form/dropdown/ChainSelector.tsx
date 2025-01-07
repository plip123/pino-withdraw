import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_CHAIN,
  SUPPORTED_CHAIN_IDS,
  SUPPORTED_CHAINS,
} from "@/constants";
import type { IChainSelector } from "./ChainSelector.interface";
import { getChainById, getChainIcon } from "@/utils";
import { useNotificationProvider } from "@/providers";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { useAccount } from "wagmi";
import { useSwitchChain } from "@/hooks";

export const ChainSelector = ({
  newChainId,
  size = "normal",
  fullWidth = false,
  onChange,
}: IChainSelector) => {
  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();
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
      await switchChain(id);
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

  const finalSizeClassName = useMemo(() => {
    switch (size) {
      case "normal":
        return "h-10";
      case "large":
        return "h-16";
      case "xlarge":
        return "h-20";
      default:
        return "h-10";
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
      placeholder={"Select Chain"}
      onChange={(e) => handleChainChange(e.value)}
      valueTemplate={chainOptionTemplate}
      itemTemplate={chainOptionTemplate}
      className={finalChainSelectorClassName}
      autoOptionFocus
    />
  );
};
