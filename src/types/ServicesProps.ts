export interface SituacaoAgendamento {
  cdSituacaoAgendamento: number;
  deSituacaoAgendamento: string;
  sgSituacaoAgendamento: string;
  nmIcon: string;
  nmCor: string;
  dtCadastro: string;
}

export interface SituacaoServico {
  cdSituacaoServico: number;
  deSituacaoServico: string;
  sgSituacaoServico: string;
  nmIcon: string;
  nmCor: string;
  dtCadastro: string;
}

export interface TipoServico {
  cdTipoServico: number;
  deTipoServico: string;
  sgTipoServico: string;
  dtCadastro: string;
}

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

export interface TipoJornada {
  cdTipoJornada: number;
  deTipoJornada: string;
  sgTipoJornada: string;
  dtCadastro: string;
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
  flTermo: string;
}

export interface Servico {
  cdServico: number;
  tmServico: string;
  nmServico: string;
  deServico: string;
  situacaoServico: SituacaoServico;
  tipoServico: TipoServico;
  gerenciador: Gerenciador;
  dtRemocao?: string;
  dtCadastro: string;
  dtAtualizacao?: string;
  cdUsuarioCadastro: number;
  cdUsuarioAtualizacao?: number;
}

export interface Cliente {
  cdUsuario: number;
  nmUsuario: string;
  nmSenha: string;
  nmEmail: string;
  nmTelefone: string;
  dtCadastro: string;
  situacaoUsuario: SituacaoUsuario;
  tipoUsuario: TipoUsuario;
  flTermo: string;
}

export interface GetUsuarios {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: Gerenciador[];
}

export interface GetSituacaoServico {
  cdSituacaoServico: number;
  deSituacaoServico: string;
  sgSituacaoServico: string;
  nmIcon: string;
  nmCor: string;
  dtCadastro: string;
}

export interface GetUsuarioTipo {
  cdTipoUsuario: number;
  deTipoUsuario: string;
  sgTipoUsuario: string;
  dtCadastro: string;
  authority: string;
}

export interface GetJornadaTipo {
  cdSituacaoAgendamento: number;
  deSituacaoAgendamento: string;
  sgSituacaoAgendamento: string;
  nmIcon: string;
  nmCor: string;
  dtCadastro: string;
}

export interface GetServicoTipo {
  cdTipoServico: number;
  deTipoServico: string;
  sgTipoServico: string;
  dtCadastro: string;
}

export interface GetAgendamentoSituacao {
  cdSituacaoAgendamento: number;
  deSituacaoAgendamento: string;
  sgSituacaoAgendamento: string;
  nmIcon: string;
  nmCor: string;
  dtCadastro: string;
}

export interface GetSituacaoUsuario {
  cdSituacaoUsuario: number;
  deSituacaoUsuario: string;
  sgSituacaoUsuario: string;
  nmIcon: string;
  nmCor: string;
  dtCadastro: string;
}

export interface Content {
  cdAgendamento: number;
  nmAgendamento: string;
  deAgendamento: string;
  dtInicio: string;
  dtTermino: string;
  dtExecucao?: string;
  situacaoAgendamento: SituacaoAgendamento;
  servico: Servico;
  cliente: Cliente;
  gerenciador: Gerenciador;
  dtCadastro: string;
  dtAtualizacao?: string;
  cdUsuarioCadastro: number;
  cdUsuarioAtualizacao?: number;
  dtRemocao?: string;
}

export interface GetAgendamentos {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: Content[];
}

export interface PostUsuario {
  nmEmail: string;
  nmSenha: string;
}

export interface PostRegistroUsuario {
  nmUsuario: string;
  nmSenha: string;
  nmEmail: string;
  nmTelefone: string;
  situacaoUsuario: SituacaoUsuario;
  tipoUsuario: TipoUsuario;
  flTermo: string;
}

export interface PostAgendamento {
  cdAgendamento?: number;
  nmAgendamento: string;
  deAgendamento: string;
  dtInicio: string;
  dtTermino: string;
  dtExecucao?: string;
  situacaoAgendamento: SituacaoAgendamento;
  servico: Servico;
  cliente: Cliente;
  gerenciador: Gerenciador;
  dtCadastro: string;
  dtAtualizacao?: string;
  cdUsuarioCadastro?: number;
  cdUsuarioAtualizacao?: number;
  dtRemocao?: string;
}

export interface PostJornada {
  gerenciador: Gerenciador;
  hrInicio: string;
  hrFim: string;
  hrInicioIntervalo: string;
  hrFimIntervalo: string;
  cdDiaSemana: number;
  tipoJornada: {};
}

export interface PutUsuario {
  cdUsuario: number;
  nmUsuario: string;
  nmSenha: string;
  nmEmail: string;
  nmTelefone: string;
  dtCadastro: string;
  situacaoUsuario: SituacaoUsuario;
  tipoUsuario: TipoUsuario;
  flTermo: string;
}

export interface GetJornadaUsuario {
  cdJornada: number;
  gerenciador: Gerenciador;
  hrInicio: string;
  hrFim: string;
  hrInicioIntervalo: string;
  hrFimIntervalo: string;
  cdDiaSemana: number;
  tipoJornada: TipoJornada;
  dtRemocao?: string;
  dtCadastro: string;
  dtAtualizacao?: string;
  cdUsuarioCadastro: number;
  cdUsuarioAtualizacao?: number;
}

export interface PostServico {
  cdServico?: number;
  nmServico: string;
  deServico: string;
  situacaoServico: SituacaoServico;
  tipoServico: TipoServico;
  dtCadastro: string;
  dtAtualizacao?: string;
  cdUsuarioCadastro: number;
  cdUsuarioAtualizacao?: number;
  dtRemocao?: string;
}

export interface ContentServico {
  cdServico: number;
  tmServico: string;
  nmServico: string;
  deServico: string;
  situacaoServico: SituacaoServico;
  tipoServico: TipoServico;
  gerenciador: Gerenciador;
  dtRemocao?: string;
  dtCadastro: string;
  dtAtualizacao?: string;
  cdUsuarioCadastro: number;
  cdUsuarioAtualizacao?: number;
}

export interface GetServicos {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: ContentServico[];
}
