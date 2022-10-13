export interface SituacaoUsuario {
  cdSituacaoUsuario: number;
  deSituacaoUsuario: string;
  sgSituacaoUsuario: string;
  nmIcon: string;
  nmCor: string;
  dtCadastro: string;
}

export interface TipoUsuario {
  cdTipoUsuario: number;
  deTipoUsuario: string;
  sgTipoUsuario: string;
  dtCadastro: string;
  authority: string;
}

export interface UserProps {
  cdUsuario: string;
  nmUsuario: string;
  nmSenha: string;
  nmEmail: string;
  nmTelefone: string;
  dtCadastro: string;
  situacaoUsuario: SituacaoUsuario;
  tipoUsuario: TipoUsuario;
  schedules: any;
}

export interface UserResultProps {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: UserProps[];
}

export interface Gerenciador {
  cdUsuario: number;
  nmUsuario: string;
  nmSenha: string;
  nmEmail: string;
  nmTelefone: string;
  dtCadastro: string;
  situacaoUsuario: SituacaoUsuario;
  tipoUsuario: TipoUsuario;
}

export interface TipoJornada {
  cdTipoJornada: number;
  deTipoJornada: string;
  sgTipoJornada: string;
  dtCadastro: string;
}

export interface HorarioProps {
  cdJornada?: number;
  gerenciador?: Gerenciador;
  hrInicio: string;
  hrFim: string;
  hrInicioIntervalo: string;
  hrFimIntervalo: string;
  cdDiaSemana?: number;
  tipoJornada?: TipoJornada;
  dtRemocao?: any;
  dtCadastro?: string;
  dtAtualizacao?: any;
  cdUsuarioCadastro?: number;
  cdUsuarioAtualizacao?: any;
}
