import { api } from 'services/api';

export async function patchValidateAWS(cdAgendamento: number) {
  const { data, status } = await api.patch(
    `/agendamentos/${cdAgendamento}/executar`,
  );

  return { data, status };
}
