import { GetUsuarios } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getBarberToApproveAWS(page: number) {
  const { data, status } = await api.get<GetUsuarios>(
    `usuarios?sgTipoUsuario=GER&sgSituacaoUsuario=EAN&page=${page}`,
  );

  return { data, status };
}
