import { BsCalendar, BsClock } from 'react-icons/bs';

import Avvvatars from 'avvvatars-react';
import cx from 'classnames';
import { CardBarbeiroProps } from 'types/IComponents';
import { Schedule } from 'types/IContext';

import { getDiaSemana } from 'utils/semanas';

import { usePhoto } from 'hooks/usePhoto';

import styles from './CardBarbeiro.module.scss';

export function CardBarbeiro(props: CardBarbeiroProps) {
  const { photo, name } = usePhoto(props.barbeiro?.id || '');

  const diaAtual = String(new Date().getDay());
  const schedules: Schedule[] = JSON.parse(props.barbeiro?.schedules);

  function getDiasFuncionamento() {
    const dias = [] as string[];
    schedules?.map((schedule) => {
      if (schedule.week_day !== '') {
        dias.push(getDiaSemana(schedule?.week_day || ''));
      }
    });
    return dias;
  }

  function getHorarioAtual(week_day: string) {
    const horario = [] as string[];
    schedules?.map((schedule) => {
      if (schedule.week_day === week_day) {
        horario.push(schedule.from + ' às ' + schedule.to);
      }
    });
    return horario;
  }

  return (
    <div
      className={cx(styles.card, {
        [styles.cardAdmin]: props.hover,
        [styles.cardCliente]: props.cliente,
        [styles.cardDisabled]: props.disabled,
      })}
      onClick={props.onClick}
      key={props.barbeiro?.id}
    >
      <div className={styles.containerImg}>
        {photo === '' &&
        (props.barbeiro?.avatar_url === null ||
          props.barbeiro?.avatar_url === undefined) ? (
          <Avvvatars value={props.barbeiro?.nome || ''} size={72} />
        ) : (
          <img
            src={photo || props.barbeiro?.avatar_url || props.barbeiro?.picture}
            alt={props.barbeiro?.nome}
          />
        )}
      </div>

      {props.cliente === true ? (
        <div className={styles.containerInfo}>
          <h2 className={styles.title}>{name || props.barbeiro?.nome}</h2>
        </div>
      ) : (
        <div className={styles.containerInfo}>
          <h2 className={styles.title}>{name || props.barbeiro?.nome}</h2>
          <strong className={styles.info}>
            {schedules === undefined || schedules === null ? (
              <>
                <BsCalendar
                  color="#FF9000"
                  size={16}
                  style={{ marginRight: '12px' }}
                />
                Sem data definida
              </>
            ) : (
              <>
                <BsCalendar
                  color="#FF9000"
                  size={16}
                  style={{ marginRight: '12px' }}
                />
                {getDiasFuncionamento()[0]} à{' '}
                {getDiasFuncionamento()[getDiasFuncionamento().length - 1]}
              </>
            )}
          </strong>
          <strong className={styles.info}>
            {schedules === undefined || schedules === null ? (
              <>
                <BsClock
                  color="#FF9000"
                  size={16}
                  style={{ marginRight: '12px' }}
                />
                Sem horário definido
              </>
            ) : (
              <>
                {getHorarioAtual(diaAtual).length === 0 ? (
                  <>
                    <BsClock
                      color="#FF9000"
                      size={16}
                      style={{ marginRight: '12px' }}
                    />
                    Hoje | Fechado
                  </>
                ) : (
                  <>
                    <BsClock
                      color="#FF9000"
                      size={16}
                      style={{ marginRight: '12px' }}
                    />
                    Hoje | {getHorarioAtual(diaAtual)}
                  </>
                )}
              </>
            )}
          </strong>
        </div>
      )}
    </div>
  );
}
