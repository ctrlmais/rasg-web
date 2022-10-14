import { PostRegistroUsuario } from 'types/ServicesProps';

import { api } from 'services/api';

export async function postRegisterUserAWS(payload: PostRegistroUsuario) {
  const { data, status } = await api.post('usuarios', payload);

  return { data, status };
}
