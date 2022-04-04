import { useNavigate } from 'react-router-dom';

import { ClienteMetadata, UserMetadata } from 'types/IContext';

import { CardBarbeiro } from 'components/CardBarbeiro';
import { CardCliente } from 'components/CardCliente';

import { useUser } from 'contexts/User';

import { useAuth } from 'hooks/useAuth';

import styles from './Cliente.module.scss';

export function Cliente() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setBarbeiro, barbeiros, horariosAgendados } = useUser();

  return (
    <>
      {horariosAgendados.length > 0 && (
        <>
          <h2 className={styles.titleHome}>Seus horários agendados para hoje:</h2>
          <div className={styles.containerHorarios}>
            {horariosAgendados.map((horario: ClienteMetadata) => (
              <CardCliente key={horario.id} cliente={horario} />
            ))}
          </div>
        </>
      )}

      <h2 className={styles.titleHome}>
        Olá {user?.user_metadata.name}, eu encontrei {barbeiros.length}{' '}
        {barbeiros.length > 1 ? 'barbeiros' : 'barbeiro'} para você!
      </h2>
      <div className={styles.containerList}>
        {barbeiros.map((barbeiro: UserMetadata) => (
          <CardBarbeiro
            key={barbeiro.id}
            barbeiro={barbeiro}
            onClick={() => {
              setBarbeiro(barbeiro);
              navigate(`/p/${barbeiro.id}`);
            }}
          />
        ))}
      </div>
    </>
  );
}
