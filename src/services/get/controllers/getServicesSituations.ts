import { GetSituacaoServico } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getServicesSituationsAWS() {
  const { data, status } = await api.get<GetSituacaoServico[]>(
    `jornadas/tipos`,
  );

  return { data, status };
}
