import { GetJornadaTipo } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getJourneyTypesAWS() {
  const { data, status } = await api.get<GetJornadaTipo[]>(
    `servicos/situacoes`,
  );

  return { data, status };
}
