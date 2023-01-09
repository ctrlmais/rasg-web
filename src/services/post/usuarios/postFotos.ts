import { api } from 'services/api';

export async function postFotosAWS(multipartFormData: FormData) {
  const { data, status } = await api.post('usuarios/fotos', multipartFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return { data, status };
}
