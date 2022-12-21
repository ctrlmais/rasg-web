import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  SetStateAction,
} from 'react';

import { Content, Gerenciador } from './ServicesProps';

export interface AgendaProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  success?: boolean;
  error?: boolean;
  warning?: boolean;
  info?: boolean;
  close?: boolean;
}

export interface BadgeProps {
  primary: boolean;
  children: React.ReactNode;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface CardBarbeiroProps extends HTMLAttributes<HTMLDivElement> {
  cliente?: boolean;
  barbeiro?: Gerenciador;
  hover?: boolean;
}

export interface CardClienteProps extends HTMLAttributes<HTMLDivElement> {
  cliente: Content;
  first?: boolean;
  data?: boolean;
}

export interface DropdownItemProps {
  link?: string;
  goToMenu?: SetStateAction<string>;
  leftIcon?: boolean | React.ReactNode;
  children?: boolean | React.ReactNode;
  rightIcon?: boolean | React.ReactNode;
  onClick?: () => void;
  logout?: boolean;
}

export interface DropzoneProps {
  onFileUploaded: (file: File) => void;
}

export interface HeaderProps {
  logo?: boolean;
  back?: boolean;
  path?: string;
}

export interface HorariosProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  horario: string;
  disabled: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

export interface NavBarProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  back?: boolean;
  path?: string;
}

export interface NavItemProps {
  children?: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface OcupacaoProps {
  cliente?: string;
  barbeiro?: string;
}

export type OverlayProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  calendar?: boolean;
};

export interface SocialButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement;
  text: string;
  apple?: boolean;
  google?: boolean;
  whatsapp?: boolean;
}

export interface TicketProps {
  cliente?: Content;
  enable?: boolean;
  execute?: boolean;
}
