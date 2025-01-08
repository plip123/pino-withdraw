import { ChangeEventHandler, useMemo } from "react";
import { IInputAmount } from "./InputAmount.interface";
import { DEFAULT_CHAIN, USDT_DATA } from "@/constants";
import { useAccount } from "wagmi";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";

export const InputAmount = ({
  id,
  label,
  value,
  tokenSymbol,
  prefix,
  invalid,
  className,
  disabled = false,
  readOnly = false,
  loading = false,
  onChange,
}: IInputAmount) => {
  const { chainId } = useAccount();

  const prefixSymbol = useMemo(() => {
    return prefix ?? `${tokenSymbol} `;
  }, [prefix, tokenSymbol]);

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value: unprefixedValue } = event.target;
    const [whole, decimal] = (
      unprefixedValue.split(prefixSymbol)[1]?.trim() || unprefixedValue.trim()
    )
      .replace(/[^\d.]*/g, "")
      .replace(/[.]/, "$")
      .replace(/[.]/g, "")
      .replace("$", ".")
      .replace(/^0+/, "0")
      .replace(/^0*(\d+)/, "$1")
      .split(".");
    const maxDecimal = decimal
      ? decimal.slice(0, USDT_DATA[chainId ?? DEFAULT_CHAIN.id].decimals)
      : decimal;
    const newValue = `${whole || "0"}${maxDecimal === "" || maxDecimal ? "." + maxDecimal : ""}`;
    const amountInToken = newValue || "0";
    onChange?.(amountInToken);
  };

  return (
    <div className="relative">
      {!!label && (
        <label htmlFor={id ?? "amount-input"} className="font-semibold">
          {label}
        </label>
      )}
      <InputText
        id={id ?? "amount-input"}
        value={`${prefixSymbol} ${value?.toString() || ""}`}
        onChange={handleChangeValue}
        placeholder={prefixSymbol}
        invalid={invalid}
        className={`w-full ${className}`}
        disabled={disabled}
        readOnly={readOnly}
      />
      {loading && (
        <ProgressSpinner
          strokeWidth="5"
          className="absolute right-2 top-1/2 w-5 h-5 -translate-y-1/2"
        />
      )}
    </div>
  );
};
