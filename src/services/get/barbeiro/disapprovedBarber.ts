import { api } from 'services/api';

export async function getBarbeirosToApproveReprovadoAWS(page: number) {
  const { data, status } = await api.get(
    `usuarios?sgTipoUsuario=GER&sgSituacaoUsuario=RPR&page=${page}`,
  );

  return { data, status };
}
