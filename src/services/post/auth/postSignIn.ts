import { PostUsuario } from 'types/ServicesProps';

import { api } from 'services/api';

export async function postSignInAWS(payload: PostUsuario) {
  const { data, status } = await api.post('autenticacoes', payload);

  return { data, status };
}
