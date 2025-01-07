import { InputText } from "primereact/inputtext";
import { useTransferForm } from "../hooks/useTransferForm";
import { InputAmount } from "@/components";
import { DEFAULT_CHAIN, USDT_DATA } from "@/constants";
import { useAccount } from "wagmi";

export const TransferForm = () => {
  const { chainId, isConnected } = useAccount();
  const {
    toAddress,
    addressError,
    amount,
    amountError,
    handleAmount,
    handleAddress,
  } = useTransferForm();

  return (
    <div>
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
        />
        {amountError && (
          <small id="address-input-help" className="text-red-500">
            {amountError}
          </small>
        )}
      </div>
    </div>
  );
};
