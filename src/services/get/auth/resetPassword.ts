import { api } from 'services/api';

export async function resetPasswordAWS(email: string) {
  const { data, status } = await api.get(
    `autenticacoes/redefinirSenha/${email}`,
  );

  return { data, status };
}
