import CopyToClipboard from 'react-copy-to-clipboard';
import { FiCopy } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { SiApple, SiGooglecalendar, SiWhatsapp } from 'react-icons/si';

import { AgendaProps } from 'types/IComponents';

import { SocialButton } from 'components/SocialButton';

import { useAgenda } from 'hooks/useAgenda';
import { useTicket } from 'hooks/useTicket';

import styles from './Agenda.module.scss';

export function Agenda(props: AgendaProps) {
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
        <SocialButton
          google
          onClick={() => {
            handleGoogleCalendarCliente();
          }}
          text="Adicionar ao Google Calendar"
          icon={<SiGooglecalendar />}
        />

        <SocialButton
          apple
          onClick={() => {
            eventSaveBarbeiro.download();
          }}
          text="Adicionar ao Apple Calendar"
          icon={<SiApple />}
        />

        <SocialButton
          whatsapp
          onClick={() => {
            contactCliente(whatsAppNumber);
          }}
          text="Enviar mensagem via Whatsapp"
          icon={<SiWhatsapp />}
        />

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
