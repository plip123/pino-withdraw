import { InputText } from "primereact/inputtext";
import { useTransferForm } from "../hooks/useTransferForm";

export const TransferForm = () => {
  const { toAddress, addressError, handleAddress } = useTransferForm();

  return (
    <div className="flex w-full flex-col">
      <label htmlFor="address-input">To:</label>
      <InputText
        id="address-input"
        value={toAddress}
        onChange={(e) => handleAddress(e.target.value)}
        type="text"
        className="p-inputtext-lg w-full"
        placeholder={"0x"}
        invalid={!!addressError}
      />
    </div>
  );
};
