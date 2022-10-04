import { SituacaoUsuario } from 'types/Aws';

import { api } from 'services/api';

export async function situationUserAWS() {
  const { data, status } = await api.get<SituacaoUsuario[]>(
    `usuarios/situacoes`,
  );

  return { data, status };
}
