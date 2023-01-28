import { api } from 'services/api';

export async function deleteJourneysAWS(cdJonada: string) {
  const { data, status } = await api.delete(`jornadas/${cdJonada}`);

  return { data, status };
}
