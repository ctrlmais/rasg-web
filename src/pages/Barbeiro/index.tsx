import { useState } from 'react';
import { DayPicker } from 'react-day-picker';

import { ptBR } from 'date-fns/locale';
import { ClienteMetadata } from 'types/IContext';

import { CardCliente } from 'components/CardCliente';

import { getDiaSemana } from 'utils/diaDaSemana';

import { useUser } from 'contexts/User';

import styles from './Barbeiro.module.scss';

export function Barbeiro() {
  const [visible, setVisible] = useState(true);

  const {
    clientes,
    selectDay,
    setSelectDay,
    selectDayFormatted,
    atualDayFormatted,
    getClientesMorning,
    getClientesAfternoon,
    getClientesNight,
    getFirstCliente,
  } = useUser();

  return (
    <>
      {visible ? (
        <>
          <div className={styles.containerCalendar}>
            <button
              className={styles.button}
              type="button"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Ocultar calendário
            </button>
          </div>
          <div className={styles.calendar}>
            <DayPicker
              mode="single"
              locale={ptBR}
              fromMonth={new Date()}
              selected={selectDay}
              onDayClick={(day) => {
                setSelectDay(day);
              }}
              modifiers={{
                available: { dayOfWeek: [0, 1, 2, 3, 4, 5, 6] },
              }}
            />
          </div>
        </>
      ) : (
        <div className={styles.containerCalendar}>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            Exibir calendário
          </button>
        </div>
      )}
      <div className={styles.containerHorarioAgendados}>
        <h2 className={styles.titleHome}>Horários agendados</h2>
        <p className={styles.infoText}>
          Hoje | Dia {new Date().getDate()} | {getDiaSemana()}
        </p>
      </div>
      {selectDayFormatted >= atualDayFormatted ? (
        <>
          <h2 className={styles.shift}>Atendimento a seguir</h2>
          {getFirstCliente() && <CardCliente cliente={getFirstCliente()} />}

          <div className={styles.containerList}>
            {getClientesMorning().length > 0 && (
              <>
                <h3 className={styles.shift}>
                  Manhã
                  <div className={styles.line} />
                </h3>
                {getClientesMorning().map((cliente: ClienteMetadata) => (
                  <CardCliente key={cliente.id} cliente={cliente} />
                ))}
              </>
            )}

            {getClientesAfternoon().length > 0 && (
              <>
                <h2 className={styles.shift}>
                  Tarde
                  <div className={styles.line} />
                </h2>
                {getClientesAfternoon().map((cliente: ClienteMetadata) => (
                  <CardCliente key={cliente.id} cliente={cliente} />
                ))}
              </>
            )}

            {getClientesNight().length > 0 && (
              <>
                <h2 className={styles.shift}>
                  Noite
                  <div className={styles.line} />
                </h2>
                {getClientesNight().map((cliente: ClienteMetadata) => (
                  <CardCliente key={cliente.id} cliente={cliente} />
                ))}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          {clientes.map((cliente: ClienteMetadata) => (
            <CardCliente key={cliente.id} cliente={cliente} />
          ))}
        </>
      )}
    </>
  );
}
