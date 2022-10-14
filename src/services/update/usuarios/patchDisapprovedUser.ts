import { api } from 'services/api';

export async function patchDisapprovedUserAWS(id: number) {
  const { data, status } = await api.patch(`usuarios/reprovar/${id}`);

  return { data, status };
}
