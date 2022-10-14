import { api } from 'services/api';

export async function patchApprovedUserAWS(id: number) {
  const { data, status } = await api.patch(`usuarios/aprovar/${id}`);

  return { data, status };
}
