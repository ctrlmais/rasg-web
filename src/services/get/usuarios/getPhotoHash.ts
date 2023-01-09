import { Buffer } from 'buffer';

import { api } from 'services/api';

export async function getSearchPhotoByHashAWS(hash: string) {
  const { data, status } = await api.get(`usuarios/fotos/full/${hash}`, {
    responseType: 'arraybuffer',
  });

  const base64 = Buffer.from(data, 'binary').toString('base64');

  return { data: base64, status };
}
