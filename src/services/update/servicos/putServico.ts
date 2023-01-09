import { PostServico } from 'types/ServicesProps';

import { api } from 'services/api';

export async function putServicesAWS(payload: PostServico) {
  const { data, status } = await api.put(`servicos`, payload);

  return { data, status };
}
