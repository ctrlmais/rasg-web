import { api } from 'services/api';

export async function approvedUserAWS(id: string) {
  const { data, status } = await api.patch(`usuarios/aprovar/${id}`);

  return { data, status };
}
