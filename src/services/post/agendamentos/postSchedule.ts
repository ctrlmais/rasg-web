import { PostAgendamento } from 'types/ServicesProps';

import { api } from 'services/api';

export async function postScheduleAWS(payload: PostAgendamento) {
  const { data, status } = await api.post('agendamentos', payload);

  return { data, status };
}
