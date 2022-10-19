import { GetAgendamentos } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getsShedulesByIdAWS(
  dtInicio: string,
  dtFim: string,
  cdCliente: number,
) {
  const { data, status } = await api.get<GetAgendamentos>(
    `agendamentos?dtInicio=${dtInicio}&dtTermino=${dtFim}&cdCliente=${cdCliente}`,
  );

  return { data, status };
}
