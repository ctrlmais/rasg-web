import { PostJornada } from 'types/ServicesProps';

import { api } from 'services/api';

export async function putJourneysAWS(payload: PostJornada, cdJonada: string) {
  const { data, status } = await api.put(`jornadas/${cdJonada}`, payload);

  return { data, status };
}
