import { api } from 'services/api';

import { GetUsuarios } from '../../../types/ServicesProps';

export async function getByIdAWS(id: string) {
  const { data, status } = await api.get<GetUsuarios>(`usuarios/${id}`);

  return { data, status };
}
