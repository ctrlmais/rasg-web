import { GetAgendamentoSituacao } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getsShedulingSituationsAWS() {
  const { data, status } = await api.get<GetAgendamentoSituacao[]>(
    `agendamentos/situacoes`,
  );

  return { data, status };
}
