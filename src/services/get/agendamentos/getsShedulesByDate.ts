import { GetAgendamentos } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getsShedulesByDateAWS(
  dtInicio: string,
  dtFim: string,
  cdGerenciador: number,
) {
  const { data, status } = await api.get<GetAgendamentos>(
    `agendamentos?dtInicio=${dtInicio}&dtTermino=${dtFim}&cdGerenciador=${cdGerenciador}`,
  );

  return { data, status };
}
