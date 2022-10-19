import { GetJornadaUsuario } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getJourneyByIdAWS(id: number) {
  const { data, status } = await api.get<GetJornadaUsuario[]>(
    `jornadas/gerenciador/${id}`,
  );

  return { data, status };
}
