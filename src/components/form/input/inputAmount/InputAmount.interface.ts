export interface IInputAmount {
  tokenSymbol: string;
  id?: string;
  label?: string;
  value?: string | null;
  prefix?: string;
  invalid?: boolean;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  onChange?: (value: string) => void;
}
