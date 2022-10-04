import { api } from 'services/api';

export async function getUserAWS(id: string) {
  const { data, status } = await api.get(`usuarios/${id}`);

  return { data, status };
}
