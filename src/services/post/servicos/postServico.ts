import { PostServico } from 'types/ServicesProps';

import { api } from 'services/api';

export async function postServicesAWS(payload: PostServico) {
  const { data, status } = await api.post(`servicos`, payload);

  return { data, status };
}
