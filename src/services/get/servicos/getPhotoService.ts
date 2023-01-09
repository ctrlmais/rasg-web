import { GetPhotoServico } from 'types/ServicesProps';

import { api } from 'services/api';

export async function getSearchPhotoServiceByIdAWS(id: string) {
  const { data, status } = await api.get<GetPhotoServico[]>(
    `/servicos/fotos/cdServico/${id}`,
  );

  return { data, status };
}
