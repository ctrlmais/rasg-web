import { DayPicker } from 'react-day-picker';
import { FiCheck, FiInfo } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';

import { Skeleton, Tooltip } from '@mui/material';
import { imgRasgLight } from 'assets';
import ptBR from 'date-fns/locale/pt-BR';

import { Button } from 'components/Button';
import { CardBarbeiroSelected } from 'components/CardBarbeiroSelect';
import { Header } from 'components/Header';
import { HorariosMarcacao } from 'components/Horarios';
import { Overlay } from 'components/Overlay';

import { useTheme } from 'contexts/Theme';
import { useUser } from 'contexts/User';

import { useOverlay } from 'hooks/useOverlay';
import { useSchedule } from 'hooks/useSchedule';

import { css } from 'styles/calendar.styles';

import styles from './Schedule.module.scss';

export function Schedule() {
  const { theme } = useTheme();
  const {
    barbeiro,
    selectDay,
    selectHours,
    setSelectHours,
    selectDayFormattedBR,
    postShedule,
    verificaDataEHoraSelecionada,
    status,
    selectedService,
    setSelectedService,
  } = useUser();

  const {
    numerosFaltantes,
    handleSelectDay,
    getHorariosManhaBarbeiro,
    getHorariosTardeBarbeiro,
    getHorariosNoiteBarbeiro,
    disableSchedules,
    servicesBarber,
    savePhotoServices,
    loading,
  } = useSchedule();

  const { contactBarbeiro } = useOverlay();

  return (
    <>
      <style>{css}</style>
      <div className={styles.home} data-theme={theme}>
        {status === 'success' && (
          <>
            <Overlay
              calendar
              title="Agendamento concluído"
              description={`Agendamento para ${selectDayFormattedBR} às ${selectHours} com ${barbeiro?.nmUsuario}`}
            >
              <FiCheck color="#04D361" size={62} />
            </Overlay>
          </>
        )}
        <Header logo path="/schedule" />
        <div className={styles.container}>
          <div className={styles.containerCard}>
            <CardBarbeiroSelected barbeiro={barbeiro} />
            <button
              className={styles.whatsapp}
              disabled={barbeiro?.nmTelefone === null}
              onClick={() => {
                contactBarbeiro(barbeiro?.nmTelefone || '');
              }}
            >
              <SiWhatsapp color="#fff" size={24} />
            </button>
          </div>

          <div className={styles.containerTitle}>
            <h2 className={styles.title}>Escolha uma data</h2>
          </div>

          <div className={styles.calendar}>
            <DayPicker
              mode="single"
              locale={ptBR}
              fromMonth={new Date()}
              selected={selectDay}
              onDayClick={(day) => {
                handleSelectDay(day);
              }}
              modifiers={{
                available: { dayOfWeek: [0, 1, 2, 3, 4, 5, 6] },
              }}
              disabled={[
                {
                  dayOfWeek: numerosFaltantes,
                },
                {
                  before: new Date(),
                },
              ]}
            />
          </div>

          <div className={styles.containerTitle}>
            <>
              <h2 className={styles.title}>Escolha o serviço</h2>

              <div className={styles.wrapperService}>
                <div className={styles.containerService}>
                  {loading ? (
                    Array.from(new Array(3)).map((_, index) => (
                      <Skeleton
                        variant="rounded"
                        width={106}
                        height={106}
                        animation="wave"
                        key={index}
                      />
                    ))
                  ) : (
                    <>
                      {servicesBarber.map((service, index) => (
                        <div
                          key={service.cdServico}
                          className={
                            selectedService?.cdServico === service.cdServico
                              ? styles.serviceSelected
                              : styles.service
                          }
                          onClick={() => {
                            setSelectedService(service);
                          }}
                        >
                          <img
                            src={savePhotoServices[index] || imgRasgLight}
                            alt={service.deServico}
                            className={styles.imageService}
                          />
                          <Tooltip title={service.deServico} placement="top">
                            <div className={styles.containerInfo}>
                              <FiInfo color="#FF9000" size={16} />
                            </div>
                          </Tooltip>
                          <div className={styles.containerServiceInfo}>
                            <b className={styles.textService}>
                              {service.nmServico}
                            </b>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <h2 className={styles.title}>Escolha o horário</h2>

              {getHorariosManhaBarbeiro().length > 0 && <p>Manhã</p>}

              <div className={styles.containerHorario}>
                {getHorariosManhaBarbeiro().map((horario) => (
                  <HorariosMarcacao
                    key={horario}
                    disabled={disableSchedules(horario)}
                    onClick={() => {
                      setSelectHours(horario);
                    }}
                    horario={horario}
                  >
                    {horario}
                  </HorariosMarcacao>
                ))}
              </div>

              {getHorariosTardeBarbeiro().length > 0 && <p>Tarde</p>}

              <div className={styles.containerHorario}>
                {getHorariosTardeBarbeiro().map((horario) => (
                  <HorariosMarcacao
                    key={horario}
                    horario={horario}
                    disabled={disableSchedules(horario)}
                    onClick={() => {
                      setSelectHours(horario);
                    }}
                  >
                    {horario}
                  </HorariosMarcacao>
                ))}
              </div>

              {getHorariosNoiteBarbeiro().length > 0 && <p>Noite</p>}

              <div className={styles.containerHorario}>
                {getHorariosNoiteBarbeiro().map((horario) => (
                  <HorariosMarcacao
                    key={horario}
                    horario={horario}
                    disabled={disableSchedules(horario)}
                    onClick={() => {
                      setSelectHours(horario);
                    }}
                  >
                    {horario}
                  </HorariosMarcacao>
                ))}
              </div>
            </>
          </div>
          <Button
            type="button"
            disabled={!verificaDataEHoraSelecionada()}
            onClick={() => {
              postShedule();
            }}
          >
            Agendar
          </Button>
          <br />
        </div>
      </div>
    </>
  );
}
