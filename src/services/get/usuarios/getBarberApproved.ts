import { GetUsuarios } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getBarberApprovedAWS(page: number) {
  const { data, status } = await api.get<GetUsuarios>(
    `usuarios?sgTipoUsuario=GER&sgSituacaoUsuario=APR&page=${page}`,
  );

  return { data, status };
}
