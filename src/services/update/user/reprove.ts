import { api } from 'services/api';

export async function reproveUserAWS(id: string) {
  const { data, status } = await api.patch(`usuarios/reprovar/${id}`);

  return { data, status };
}
