import { PutUsuario } from 'types/ServicesProps';

import { api } from 'services/api';

export async function putUserAWS(payload: PutUsuario) {
  const { data, status } = await api.put('usuarios', payload);

  return { data, status };
}
