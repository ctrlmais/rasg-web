import { api } from 'services/api';

interface PayloadAWS {
  cdUsuario: string | undefined;
  nmUsuario: string;
  nmSenha: string | undefined;
  nmEmail: string;
  nmTelefone: string;
  dtCadastro: string | undefined;
  situacaoUsuario: {} | undefined;
  tipoUsuario: {} | undefined;
}

export async function updateProfileAWS(payload: PayloadAWS) {
  const { data, status } = await api.put('usuarios', payload);

  return { data, status };
}
