import { GetServicoTipo } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getServicesTypesAWS() {
  const { data, status } = await api.get<GetServicoTipo[]>(`servicos/tipos`);

  return { data, status };
}
