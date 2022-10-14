import { PostJornada } from 'types/ServicesProps';

import { api } from 'services/api';

export async function postJourneysAWS(payload: PostJornada) {
  const { data, status } = await api.post(`jornadas`, payload);

  return { data, status };
}
