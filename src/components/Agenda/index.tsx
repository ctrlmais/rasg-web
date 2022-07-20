import CopyToClipboard from 'react-copy-to-clipboard';
import { FiCopy } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { SiApple, SiGooglecalendar, SiWhatsapp } from 'react-icons/si';

import { useAgenda } from 'hooks/useAgenda';
import { useTicket } from 'hooks/useTicket';

import styles from './Agenda.module.scss';

interface IAgendaProps {
  onClick: () => void;
}

export function Agenda(props: IAgendaProps) {
  const { cancelarAgendamento } = useTicket();
  const {
    handleGoogleCalendarCliente,
    eventSaveBarbeiro,
    contactCliente,
    copyToClipboard,
  } = useAgenda();

  const cliente = JSON.parse(localStorage.getItem('cliente') || '');
  const whatsAppNumber = cliente?.phone;
  const agendamentoId = cliente?.id;

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={props.onClick}>
        <IoMdClose size={20} style={{ cursor: 'pointer' }} />
      </div>
      <h2>
        <CopyToClipboard text={cliente?.id} onCopy={() => copyToClipboard()}>
          <FiCopy size={20} style={{ cursor: 'pointer' }} />
        </CopyToClipboard>
        Opções adicionais
      </h2>

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
