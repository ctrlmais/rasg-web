import { api } from 'services/api';

export async function getBarbeirosAWS() {
  const { data, status } = await api(
    `usuarios?sgTipoUsuario=GER&sgSituacaoUsuario=APR`,
  );

  return { data, status };
}
