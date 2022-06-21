import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { format } from 'date-fns';
import { ClienteMetadata, UserMetadata } from 'types/IContext';

import { Alert } from 'components/Alert';
import { CardBarbeiro } from 'components/CardBarbeiro';
import { CardCliente } from 'components/CardCliente';

import { useUser } from 'contexts/User';

import { useAuth } from 'hooks/useAuth';
import { useCliente } from 'hooks/useCliente';

import styles from './Cliente.module.scss';

export function Cliente() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    barbeiros,
    horariosAgendados,
    setSelectHours,
    selectDay,
    verificaTelefone,
  } = useUser();
  const { nextDay, previousDay, handleClickBarbeiro } = useCliente();

  return (
    <>
      {!verificaTelefone() && (
        <div className={styles.containerAlertTelefone}>
          <Alert
            close
            title="Adicione um telefone para que o barbeiro possa entrar em contato com você"
            warning
            onClick={() => {
              navigate('/profile');
            }}
          />
        </div>
      )}
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
        Seus horários agendados para {format(selectDay, 'dd/MM')}:
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
          {horariosAgendados.map((horario: ClienteMetadata) => (
            <CardCliente
              key={horario.id}
              cliente={horario}
              onClick={() => {
                setSelectHours(horario.hour);
                navigate(`ticket/${horario.client_id}`);
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
      <h2 className={styles.titleHome}>
        {barbeiros.length >= 1
          ? `
        Olá ${user?.user_metadata.name}, eu encontrei ${barbeiros.length}
        ${barbeiros.length > 1 ? 'barbeiros' : 'barbeiro'} para você!
        `
          : 'Ops não encontrei nenhum barbeiro. 😢'}
      </h2>
      <div className={styles.containerList}>
        {barbeiros.map((barbeiro: UserMetadata) => (
          <CardBarbeiro
            key={barbeiro.id}
            barbeiro={barbeiro}
            onClick={() => {
              handleClickBarbeiro(barbeiro);
            }}
          />
        ))}
      </div>
    </>
  );
}
