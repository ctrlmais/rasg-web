import { api } from 'services/api';

interface PayloadAWS {
  nmUsuario: string;
  nmSenha: string;
  nmEmail: string;
  nmTelefone: string;
  situacaoUsuario: {};
  tipoUsuario: {};
}

export async function registerUserAWS(payload: PayloadAWS) {
  const { data, status } = await api.post('usuarios', payload);

  return { data, status };
}
