import { api } from 'services/api';

export async function getBarbeirosToApproveAWS(page: number) {
  const { data, status } = await api.get(
    `usuarios?sgTipoUsuario=GER&sgSituacaoUsuario=EAN&page=${page}`,
  );

  return { data, status };
}
