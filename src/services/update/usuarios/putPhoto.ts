import { api } from 'services/api';

export async function putFotosAWS(
  multipartFormData: FormData,
  codePhoto: string,
) {
  const { data, status } = await api.put(
    `usuarios/fotos/${codePhoto}`,
    multipartFormData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return { data, status };
}
