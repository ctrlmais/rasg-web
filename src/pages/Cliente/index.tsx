import { useEffect } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { format } from 'date-fns';
import { ClienteMetadata, UserMetadata } from 'types/IContext';

import { CardBarbeiro } from 'components/CardBarbeiro';
import { CardCliente } from 'components/CardCliente';

import { useToast } from 'contexts/Toast';
import { useUser } from 'contexts/User';

import { useAuth } from 'hooks/useAuth';

import styles from './Cliente.module.scss';

export function Cliente() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { setBarbeiro, barbeiros, horariosAgendados, buscarAgendamentosData, setSelectHours, selectDay, setSelectDay } =
    useUser();

  function nextDay() {
    const nextDay = new Date(selectDay);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectDay(nextDay);
  }

  function previousDay() {
    const prevDay = new Date(selectDay);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectDay(prevDay);
  }

  useEffect(() => {
    const dateFormatted = format(selectDay, 'yyyy-MM-dd');

    buscarAgendamentosData(dateFormatted);
  }, [selectDay]);

  function handleClickBarbeiro(barbeiro: UserMetadata) {
    if (barbeiro?.schedules === null) {
      toast.error('Este barbeiro não possui horários disponíveis.', {
        id: 'toast',
      });
    } else {
      setBarbeiro(barbeiro);
      navigate(`/p/${barbeiro.id}`);
    }
  }

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
        <div className={styles.containerHorarios}>
          <h2 className={styles.titleHome}>Você não tem horários agendados para hoje.</h2>
        </div>
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
