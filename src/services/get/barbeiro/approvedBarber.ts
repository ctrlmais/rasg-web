import { api } from 'services/api';

export async function getBarbeirosApprovedAWS(page: number) {
  const { data, status } = await api.get(
    `usuarios?sgTipoUsuario=GER&sgSituacaoUsuario=APR&page=${page}`,
  );

  return { data, status };
}
