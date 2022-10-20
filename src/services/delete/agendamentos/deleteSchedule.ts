import { api } from 'services/api';

export async function deleteScheduleAWS(id: number) {
  const { data, status } = await api.delete(`agendamentos/${id}/remover`);

  return { data, status };
}
