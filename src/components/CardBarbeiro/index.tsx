import { useEffect, useState } from 'react';
import { BsCalendar, BsClock } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';

import { Skeleton } from '@mui/material';
import Avvvatars from 'avvvatars-react';
import cx from 'classnames';
import { CardBarbeiroProps } from 'types/ComponentsProps';
import { GetJornadaUsuario } from 'types/ServicesProps';

import { formatHours } from 'utils/formatHours';
import { getDiaSemana } from 'utils/semanas';

import { useToast } from 'contexts/Toast';

import {
  getJourneyByIdAWS,
  getSearchPhotoByHashAWS,
  getSearchPhotoByIdAWS,
} from 'services/get';

import styles from './CardBarbeiro.module.scss';

export function CardBarbeiro({
  cliente,
  barbeiro,
  hover,
  onClick,
  ...props
}: CardBarbeiroProps) {
  const { toast } = useToast();
  const diaAtual = String(new Date().getDay());

  const [schedules, setSchedules] = useState<GetJornadaUsuario[]>([]);
  const [photoURI, setPhotoURI] = useState('');
  const [loading, setLoading] = useState(false);

  async function getPhotoUser(id: string) {
    if (!id) return;

    setLoading(true);
    try {
      const { data } = await getSearchPhotoByIdAWS(id);

      if (!data.length) return;

      const { nmHash, nmMime } = data[0];

      const { data: photo } = await getSearchPhotoByHashAWS(nmHash);

      const photoURI = `data:${nmMime};base64,${photo}`;

      setPhotoURI(photoURI);
    } catch (error) {
      toast.error('Não foi possível carregar foto', { id: 'toast' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (barbeiro || cliente) {
      getPhotoUser(String(barbeiro?.cdUsuario));
    }
  }, [barbeiro, cliente]);

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
    <>
      {loading ? (
        <>
          <Skeleton
            variant="rounded"
            width={327}
            height={112}
            animation="wave"
          />
        </>
      ) : (
        <div
          className={cx(styles.card, {
            [styles.cardAdmin]: hover,
            [styles.cardCliente]: cliente,
            [styles.cardDisabled]: schedules.length === 0,
          })}
          onClick={schedules.length !== 0 ? onClick : () => {}}
          key={barbeiro?.cdUsuario}
        >
          <div className={styles.containerImg}>
            {loading ? (
              <>
                <Skeleton variant="circular">
                  <Avvvatars value={barbeiro?.nmUsuario || ''} size={72} />
                </Skeleton>
              </>
            ) : (
              <>
                {photoURI === '' ? (
                  <Avvvatars value={barbeiro?.nmUsuario || ''} size={72} />
                ) : (
                  <img src={photoURI} alt={barbeiro?.nmUsuario || ''} />
                )}
              </>
            )}
          </div>

          {cliente === true ? (
            <div className={styles.containerInfo}>
              <h2 className={styles.title}>{barbeiro?.nmUsuario}</h2>
              <strong className={styles.info}>
                <FiMail
                  color="#FF9000"
                  size={16}
                  style={{ marginRight: '6px' }}
                />
                {barbeiro?.nmEmail}
              </strong>
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
                        {
                          getDiasFuncionamento()[
                            getDiasFuncionamento().length - 1
                          ]
                        }
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
      )}
    </>
  );
}
