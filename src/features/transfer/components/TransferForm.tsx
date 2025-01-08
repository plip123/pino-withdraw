import { InputText } from "primereact/inputtext";
import { useTransferForm } from "../hooks/useTransferForm";
import { InputAmount } from "@/components";
import { DEFAULT_CHAIN, USDT_DATA } from "@/constants";
import { useAccount } from "wagmi";
import { Button } from "primereact/button";
import { BlockUI } from "primereact/blockui";
import { BlockUITemplate } from "./BlockUITemplate";

export const TransferForm = () => {
  const { chainId, isConnected } = useAccount();
  const {
    toAddress,
    addressError,
    amount,
    amountError,
    token,
    txHash,
    canTransfer,
    isLoading,
    isError,
    isSuccess,
    cleanTransferData,
    handleAmount,
    handleAddress,
    handleTransfer,
  } = useTransferForm();

  return (
    <BlockUI
      blocked={isLoading || isSuccess || isError}
      template={
        <BlockUITemplate
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          amount={amount}
          toAddress={toAddress}
          token={token}
          txHash={txHash}
          onClick={cleanTransferData}
        />
      }
      containerStyle={{ padding: "16px" }}
      pt={{
        mask: {
          style: {
            background:
              "radial-gradient(circle, rgba(33,33,33,0.75) 50%, rgba(29,29,29,0.6) 100%)",
          },
        },
      }}
    >
      <div className="mb-4">
        <label htmlFor="address-input" className="font-semibold">
          To:
        </label>
        <InputText
          id="address-input"
          value={toAddress}
          onChange={(e) => handleAddress(e.target.value)}
          className="w-full"
          placeholder={"0x"}
          invalid={!!addressError}
          disabled={!isConnected || isLoading}
        />
        {addressError && (
          <small id="address-input-help" className="text-red-500">
            {addressError}
          </small>
        )}
      </div>
      <div className="mb-4">
        <InputAmount
          id="usdt-amount"
          label="Amount"
          tokenSymbol={USDT_DATA[chainId ?? DEFAULT_CHAIN.id].symbol}
          loading={!isConnected}
          value={amount}
          onChange={handleAmount}
          disabled={!isConnected || isLoading}
        />
        {amountError && (
          <small id="address-input-help" className="text-red-500">
            {amountError}
          </small>
        )}
      </div>

      <Button
        label="Transfer"
        type="button"
        className="mr-3 p-button-raised w-full"
        onClick={handleTransfer}
        disabled={!canTransfer || !isConnected || isLoading}
        loading={isLoading}
      />
    </BlockUI>
  );
};
