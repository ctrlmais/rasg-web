import { api } from 'services/api';

export async function getClientsApprovedAWS(page: number) {
  const { data, status } = await api.get(
    `usuarios?sgTipoUsuario=CLI&sgSituacaoUsuario=APR&page=${page}`,
  );

  return { data, status };
}
