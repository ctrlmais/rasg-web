import { SiApple, SiGooglecalendar } from 'react-icons/si';

import { useAgenda } from 'hooks/useAgenda';

import styles from './Agenda.module.scss';

export function Agenda() {
  const { handleGoogleCalendarCliente, eventSaveBarbeiro } = useAgenda();

  return (
    <div className={styles.wrapper}>
      <h2>Adicionar ao seu calendário</h2>

      <div className={styles.containerButton}>
        <button
          className={styles.google}
          type="button"
          onClick={() => {
            handleGoogleCalendarCliente();
          }}
        >
          <SiGooglecalendar />
          Adicionar ao Google Calendar
        </button>

        <button
          className={styles.apple}
          type="button"
          onClick={() => {
            eventSaveBarbeiro.download();
          }}
        >
          <SiApple />
          Adicionar ao Apple Calendar
        </button>
      </div>
    </div>
  );
}
