import { GetUsuarios } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getByEmailAWS(email: string) {
  const { data, status } = await api.get<GetUsuarios>(
    `usuarios?sgTipoUsuario=GER&nmEmail=${email}`,
  );

  return { data, status };
}
