import { useEffect, useState } from 'react';
import { BsCalendar, BsClock } from 'react-icons/bs';

import Avvvatars from 'avvvatars-react';
import cx from 'classnames';
import { CardBarbeiroProps } from 'types/ComponentsProps';
import { GetJornadaUsuario } from 'types/ServicesProps';

import { formatHours } from 'utils/formatHours';
import { getDiaSemana } from 'utils/semanas';

import { useToast } from 'contexts/Toast';

import { getJourneyByIdAWS } from 'services/get';

import styles from './CardBarbeiro.module.scss';

export function CardBarbeiro({
  cliente,
  barbeiro,
  hover,
  ...props
}: CardBarbeiroProps) {
  const { toast } = useToast();
  const diaAtual = String(new Date().getDay());

  const [schedules, setSchedules] = useState<GetJornadaUsuario[]>([]);

  useEffect(() => {
    async function getHorariosBarbeiro() {
      try {
        const { data } = await getJourneyByIdAWS(Number(barbeiro?.cdUsuario));

        setSchedules(data);
      } catch (error) {
        toast.error('Erro ao buscar horários do barbeiro');
      }
    }

    getHorariosBarbeiro();
  }, []);

  function getDiasFuncionamento() {
    const dias = [] as string[];

    schedules?.map((schedule) => {
      if (String(schedule.cdDiaSemana) !== '') {
        dias.push(getDiaSemana(String(schedule.cdDiaSemana)));
      }
    });
    return dias;
  }

  function getHorarioAtual(cdDiaSemana: string) {
    const horarios = [] as string[];
    schedules?.map((schedule) => {
      if (String(schedule.cdDiaSemana) === cdDiaSemana) {
        horarios.push(
          formatHours(schedule.hrInicio) + ' às ' + formatHours(schedule.hrFim),
        );
      }
    });
    return horarios;
  }

  return (
    <div
      className={cx(styles.card, {
        [styles.cardAdmin]: hover,
        [styles.cardCliente]: cliente,
        [styles.cardDisabled]: schedules.length === 0,
      })}
      onClick={schedules.length !== 0 ? props.onClick : () => {}}
      key={barbeiro?.cdUsuario}
    >
      <div className={styles.containerImg}>
        <Avvvatars value={barbeiro?.nmUsuario || ''} size={72} />
      </div>

      {cliente === true ? (
        <div className={styles.containerInfo}>
          <h2 className={styles.title}>{barbeiro?.nmUsuario}</h2>
        </div>
      ) : (
        <div className={styles.containerInfo}>
          <h2 className={styles.title}>{barbeiro?.nmUsuario}</h2>
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
                {schedules.length === 0 ? (
                  'Sem data definida'
                ) : (
                  <>
                    {getDiasFuncionamento()[0]} à{' '}
                    {getDiasFuncionamento()[getDiasFuncionamento().length - 1]}
                  </>
                )}
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
