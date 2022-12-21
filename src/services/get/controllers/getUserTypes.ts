import { GetUsuarioTipo } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getUserTypesAWS() {
  const { data, status } = await api.get<GetUsuarioTipo[]>(`usuarios/tipos`);

  return { data, status };
}
