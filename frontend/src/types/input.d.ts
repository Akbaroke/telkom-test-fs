type InputType = {
  name: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  loading?: boolean;
  icon?: React.ReactElement;
  error?: string;
};

export default InputType;
