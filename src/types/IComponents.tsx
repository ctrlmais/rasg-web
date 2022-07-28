import { ReactChild, ReactFragment, ReactPortal, SetStateAction } from 'react';

import { ClienteMetadata, UserMetadata } from './IContext';

/* eslint-disable no-unused-vars */
export interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export interface ButtonGoogleProps {
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
}

export interface HeaderProps {
  logo?: boolean;
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

export type OverlayProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  calendar?: boolean;
};

export interface NavItemProps {
  children?: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface NavBarProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  back?: boolean;
}

export interface DropdownItemProps {
  link?: string;
  goToMenu?: SetStateAction<string>;
  leftIcon?: boolean | ReactChild | ReactFragment | ReactPortal;
  children?: boolean | ReactChild | ReactFragment | ReactPortal;
  rightIcon?: boolean | ReactChild | ReactFragment | ReactPortal;
  onClick?: () => void;
  logout?: boolean;
}

export type CardBarbeiroProps = {
  cliente?: boolean;
  barbeiro?: UserMetadata | undefined;
  onClick?: () => void;
  hover?: boolean;
};

export type CardClienteProps = {
  cliente: ClienteMetadata | undefined;
  onClick?: () => void;
  first?: boolean;
  data?: boolean;
};

export interface FloatingButtonProps {
  onClick?: () => void;
}

export interface OcupacaoProps {
  cliente?: string;
  barbeiro?: string;
}

export interface TicketProps {
  cliente?: ClienteMetadata | undefined;
}

export interface AgendaProps {
  onClick: () => void;
}

export interface AlertProps {
  title: string;
  success?: boolean;
  error?: boolean;
  warning?: boolean;
  info?: boolean;
  onClick?: () => void;
  close?: boolean;
}

export interface BadgeProps {
  primary: boolean;
  children: React.ReactNode;
}

export interface HorariosProps {
  horario: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export interface SocialButtonProps {
  onClick: () => void;
  icon?: React.ReactElement;
  text: string;
  apple?: boolean;
  google?: boolean;
  whatsapp?: boolean;
}
