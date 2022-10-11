import { api } from 'services/api';

interface PayloadAWS {
  nmEmail: string;
  nmSenha: string;
}

export async function signInAWS(payload: PayloadAWS) {
  const { data, status } = await api.post('autenticacao', payload);

  return { data, status };
}
