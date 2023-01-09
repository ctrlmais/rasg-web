import { GetPhotoUsuario } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getSearchPhotoByIdAWS(id: string) {
  const { data, status } = await api.get<GetPhotoUsuario[]>(
    `/usuarios/fotos/cdUsuario/${id}`,
  );

  return { data, status };
}
