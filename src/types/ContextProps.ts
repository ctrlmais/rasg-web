import { ChangeEvent, FormEvent } from 'react';

import { FormikErrors, FormikTouched } from 'formik';

import {
  Cliente,
  Content,
  Gerenciador,
  GetJornadaUsuario,
} from './ServicesProps';

export interface AuthContextProps {
  signed: boolean;
  user: Cliente | undefined;
  setUser: (user: Cliente) => void;
  handleLogout: () => void;
  formikLogin: FormikProps;
  ocupacao: string;
  setOcupacao: (ocupacao: string) => void;
  loading: boolean;
  storagedUser: Cliente;
  storagedHorarios: GetJornadaUsuario[];
}

export interface FormikProps {
  values: {
    email: string;
    password: string;
  };
  errors: FormikErrors<{
    email: string;
    password: string;
  }>;
  touched: FormikTouched<{
    email: boolean;
    password: boolean;
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
  barberId: number | undefined;
  clientId: number | undefined;
  barbeiro: Gerenciador | undefined;
  setBarbeiro: (barbeiro: Gerenciador) => void;
  barbeiros: Gerenciador[];
  setBarbeiros: (barbeiros: Gerenciador[]) => void;
  clientes: Content[];
  setClientes: (clientes: Content[]) => void;
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
  verificaOcupacao: (
    ocupacao: string,
  ) => 'ADMINISTRADOR' | 'GERENCIADOR' | 'CLIENTE' | undefined;
  getClientesMorning: () => Content[];
  getClientesAfternoon: () => Content[];
  getClientesNight: () => Content[];
  getFirstCliente: () => Content;
  selectDayFormattedBR: string;
  postShedule: () => void;
  getHorariosMarcados: () => string[];
  isHorarioMarcado: (horario: string) => boolean;
  isDataEHorarioPassado: (data: string, horario: string) => boolean;
  verificaDataEHoraSelecionada: () => boolean;
  horariosAgendados: Content[];
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
  loading: boolean;
  emailUser: string;
  situation: string;
  verificaHorario: (horario: string) => 'MANHÃ' | 'TARDE' | 'NOITE' | undefined;
}
