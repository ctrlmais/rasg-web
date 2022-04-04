/* eslint-disable no-unused-vars */
export interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ButtonGoogleProps {
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
}

export interface HeaderProps {
  name?: string;
  profile?: string;
  avatar?: string;
  logo?: boolean;
  default?: boolean;
  back?: boolean;
}

export interface InputProps {
  icon: React.ReactNode;
  type: 'text' | 'password' | 'email' | 'number';
  name: string;
  placeholder: string;
  value: string;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export interface DropzoneProps {
  onFileUploaded: (file: File) => void;
}
