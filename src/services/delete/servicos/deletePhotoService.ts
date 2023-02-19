import { api } from 'services/api';

export async function deletePhotoServicesAWS(cdFotoServico: string) {
  const { data, status } = await api.delete(`servicos/fotos/${cdFotoServico}`);

  return { data, status };
}
