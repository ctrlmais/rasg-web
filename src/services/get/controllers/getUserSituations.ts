import { GetSituacaoUsuario } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getUserSituationsAWS() {
  const { data, status } = await api.get<GetSituacaoUsuario[]>(
    `usuarios/situacoes`,
  );

  return { data, status };
}
