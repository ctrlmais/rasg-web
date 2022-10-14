import { GetUsuarios } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getAllBarberAWS() {
  const { data, status } = await api.get<GetUsuarios>(
    `usuarios?sgTipoUsuario=GER&sgSituacaoUsuario=APR`,
  );

  return { data, status };
}
