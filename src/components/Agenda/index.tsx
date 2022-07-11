import { IoClose } from 'react-icons/io5';
import { SiApple, SiGooglecalendar, SiWhatsapp } from 'react-icons/si';

import { useAgenda } from 'hooks/useAgenda';
import { useTicket } from 'hooks/useTicket';

import styles from './Agenda.module.scss';

export function Agenda() {
  const { handleGoogleCalendarCliente, eventSaveBarbeiro, contactCliente } =
    useAgenda();
  const { cancelarAgendamento } = useTicket();

  const cliente = JSON.parse(localStorage.getItem('cliente') || '');
  const whatsAppNumber = cliente?.phone;
  const agendamentoId = cliente?.id;

  return (
    <div className={styles.wrapper}>
      <h2>Opções adicionais</h2>

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

        <button
          className={styles.whatsapp}
          type="button"
          onClick={() => {
            contactCliente(whatsAppNumber);
          }}
        >
          <SiWhatsapp />
          Entrar em contato via Whatsapp
        </button>

        <button
          className={styles.cancel}
          type="button"
          onClick={() => {
            cancelarAgendamento(agendamentoId);
          }}
        >
          <IoClose />
          Cancelar atendimento
        </button>
      </div>
    </div>
  );
}
