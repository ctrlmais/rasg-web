/* eslint-disable no-unused-vars */

import { ChangeEvent, FormEvent } from 'react';

import { FormikErrors, FormikTouched } from 'formik';

export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface UserMetadata {
  id: string;
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  nome: string;
  picture: string;
  provider_id: string;
  ocupacao: string;
  schedules: any;
  sub: string;
  qtd?: number;
  phone: string;
}

export interface ClienteMetadata {
  id: string;
  barber_id: string;
  client_id: string;
  client_name: string;
  client_picture?: string;
  client_avatar?: string;
  appointment_date: Date;
  br_date: string;
  date: string;
  hour: string;
  shift: string;
  created_at: Date;
  updated_at: Date;
  barber_name: string;
  barber_picture: string;
  barber_avatar: string;
}

export interface IdentityData {
  sub: string;
  avatar_url: string;
  email: string;
  email_verified?: boolean;
  full_name: string;
  iss: string;
  name: string;
  picture: string;
  provider_id: string;
}

export interface Identity {
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Schedule {
  from?: string;
  to?: string;
  week_day?: string;
}

export interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: Date;
  phone: string;
  confirmation_sent_at: Date;
  confirmed_at: Date;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
  created_at: Date;
  updated_at: Date;
}

export interface UserAuth {
  access_token: string;
  token_interface: string;
  expires_in: number;
  refresh_token: string;
  user: User;
}

export interface AuthContextProps {
  signed: boolean;
  user: User | null;
  setUser: (user: any) => void;
  handleLogout: () => void;
  handleLoginGoogle: () => void;
  formikLogin: FormikProps;
  ocupacao: string;
  setOcupacao: (ocupacao: string) => void;
  loading: boolean;
  isBarbeiro: boolean;
  isCliente: boolean;
  isAlexander: boolean;
}

export interface FormikProps {
  values: {
    email: string;
    senha: string;
  };
  errors: FormikErrors<{
    email: string;
    senha: string;
  }>;
  touched: FormikTouched<{
    email: boolean;
    senha: boolean;
  }>;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: ChangeEvent) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export interface ThemeContextProps {
  theme: string;
  switchTheme: () => void;
}

export interface ToastContextProps {
  toast: any;
}

export interface UserContextProps {
  barberId: string | undefined;
  clientId: string | undefined;
  barbeiro: UserMetadata | undefined;
  setBarbeiro: (barbeiro: UserMetadata) => void;
  barbeiros: UserMetadata[];
  setBarbeiros: (barbeiros: UserMetadata[]) => void;
  clientes: ClienteMetadata[];
  setClientes: (clientes: ClienteMetadata[]) => void;
  selectDay: Date;
  setSelectDay: (day: Date) => void;
  selectHours: string;
  setSelectHours: (hours: string) => void;
  status: string;
  setStatus: (status: string) => void;
  buscarBarbeiros: () => void;
  buscarClientes: () => void;
  selectDayFormatted: string;
  atualDayFormatted: string;
  verificaLoginGoogleEOcupacao: () => boolean;
  verificaOcupacao: (ocupacao: string) => 'cliente' | 'barbeiro' | undefined;
  getClientesMorning: () => ClienteMetadata[];
  getClientesAfternoon: () => ClienteMetadata[];
  getClientesNight: () => ClienteMetadata[];
  getFirstCliente: () => any;
  selectDayFormattedBR: string;
  postShedule: () => void;
  getHorariosMarcados: () => string[];
  isHorarioMarcado: (horario: string) => boolean;
  isDataEHorarioPassado: (data: string, horario: string) => boolean;
  verificaDataEHoraSelecionada: () => boolean;
  horariosAgendados: ClienteMetadata[];
  buscarAgendamentosData: (diaSelecionado: string) => void;
  generateGoogleCalendarEvent: (
    title: string,
    startDate: string,
    endDate: string,
    description?: string,
    location?: string,
  ) => void;
  startDate: string;
  endDate: string;
  buscaClientesHorario: (horario: string) => void;
  verificaHorarioDeTrabalho: () => boolean;
  verificaTelefone: () => boolean;
}
