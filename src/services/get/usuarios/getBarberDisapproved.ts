import { GetUsuarios } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getBarberDisapprovedAWS(page: number) {
  const { data, status } = await api.get<GetUsuarios>(
    `usuarios?sgTipoUsuario=GER&sgSituacaoUsuario=RPR&page=${page}`,
  );

  return { data, status };
}
