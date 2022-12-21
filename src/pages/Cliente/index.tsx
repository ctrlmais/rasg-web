import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Ring } from '@uiball/loaders';
import { format } from 'date-fns';

import { Alert } from 'components/Alert';
import { CardBarbeiro } from 'components/CardBarbeiro';
import { CardCliente } from 'components/CardCliente';

import { useUser } from 'contexts/User';

import { useAuth } from 'hooks/useAuth';
import { useCliente } from 'hooks/useCliente';

import styles from './Cliente.module.scss';

export function Cliente() {
  const navigate = useNavigate();
  const { storagedUser } = useAuth();
  const { barbeiros, horariosAgendados, setSelectHours, selectDay, loading } =
    useUser();
  const { nextDay, previousDay, handleClickBarbeiro } = useCliente();
  const username = storagedUser.nmUsuario;

  return (
    <>
      <div className={styles.titleContainer}>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            previousDay();
          }}
        >
          <FiArrowLeft color="#fff" size={18} />
        </button>
        Seus horários agendados para {format(selectDay, 'dd/MM')}
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            nextDay();
          }}
        >
          <FiArrowRight color="#fff" size={18} />
        </button>
      </div>
      {horariosAgendados.length > 0 ? (
        <div className={styles.containerHorarios}>
          {horariosAgendados.map((horario) => (
            <CardCliente
              key={horario.gerenciador.cdUsuario}
              cliente={horario}
              onClick={() => {
                setSelectHours(format(new Date(horario.dtInicio), 'HH:mm:ss'));
                navigate(`ticket/${horario.cdAgendamento}`);
              }}
            />
          ))}
        </div>
      ) : (
        <>
          <div className={styles.containerAlert}>
            <Alert title="Você não tem horários agendados para hoje." info />
          </div>
        </>
      )}

      {loading ? (
        <Ring speed={2} lineWeight={5} color="#ff9000" size={64} />
      ) : (
        <>
          <h2 className={styles.titleHome}>
            {barbeiros.length >= 1
              ? `
        Olá ${username}, eu encontrei ${barbeiros.length}
        ${barbeiros.length > 1 ? 'barbeiros' : 'barbeiro'} para você!
        `
              : 'Ops não encontrei nenhum barbeiro. 😢'}
          </h2>
          <div className={styles.containerList}>
            {barbeiros.map((barbeiro) => (
              <CardBarbeiro
                key={barbeiro.cdUsuario}
                barbeiro={barbeiro}
                onClick={() => {
                  handleClickBarbeiro(barbeiro);
                }}
                hover
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
