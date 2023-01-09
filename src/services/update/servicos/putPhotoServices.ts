import { api } from 'services/api';

export async function putPhotoServicesAWS(
  multipartFormData: FormData,
  codePhoto: string,
) {
  const { data, status } = await api.put(
    `servicos/fotos/${codePhoto}`,
    multipartFormData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return { data, status };
}
