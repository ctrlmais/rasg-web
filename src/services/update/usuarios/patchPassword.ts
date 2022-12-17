import { api } from 'services/api';

interface PasswordProps {
  nmToken: string;
  nmSenha: string;
}

export async function patchPasswordAWS(payload: PasswordProps) {
  const { data, status } = await api.patch(`usuarios/trocarSenha`, payload);

  return { data, status };
}
