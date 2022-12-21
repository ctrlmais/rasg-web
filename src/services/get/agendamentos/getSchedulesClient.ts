import { GetAgendamentos } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getSchedulesClientAWS(cdCliente: number) {
  const { data, status } = await api.get<GetAgendamentos>(
    `agendamentos?cdCliente=${cdCliente}&direction=DESC`,
  );

  return { data, status };
}
