import { GetServicos } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getServicesByIdAWS(id: number) {
  const { data, status } = await api.get<GetServicos>(
    `servicos?cdGerenciador=${id}`,
  );

  return { data, status };
}
