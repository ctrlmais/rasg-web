import { api } from 'services/api';

export async function getBarbeiroAWS(email: string) {
  const { data, status } = await api(
    `usuarios?sgTipoUsuario=GER&nmEmail=${email}`,
  );

  return { data, status };
}
