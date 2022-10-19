import { GetAgendamentos } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getSchedulesAWS(cdAgendamento: number) {
  const { data, status } = await api.get<GetAgendamentos>(
    `agendamentos?cdAgendamento=${cdAgendamento}`,
  );

  return { data, status };
}
