import { api } from 'services/api';

export async function deleteServicesAWS(cdServico: string) {
  const { data, status } = await api.delete(
    `servicos/${cdServico}/remover`,
    {},
  );

  return { data, status };
}
