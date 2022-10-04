import { TipoUsuario } from 'types/Aws';

import { api } from 'services/api';

export async function getUserTypeAWS() {
  const { data, status } = await api.get<TipoUsuario[]>(`usuarios/tipos`);

  return { data, status };
}
