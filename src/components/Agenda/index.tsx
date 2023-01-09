import CopyToClipboard from 'react-copy-to-clipboard';
import { BiCopy } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { SiApple, SiGooglecalendar, SiWhatsapp } from 'react-icons/si';

import { Content } from 'types/ServicesProps';

import { SocialButton } from 'components/SocialButton';

import { get8caracters } from 'utils/get8caracters';

import { useTheme } from 'contexts/Theme';

import { useAgenda } from 'hooks/useAgenda';
import { useTicket } from 'hooks/useTicket';

import styles from './Agenda.module.scss';

export function Agenda() {
  const { theme } = useTheme();
  const { cancelarAgendamento, verificaHorarioCancelamento } = useTicket();
  const {
    handleGoogleCalendarCliente,
    eventSaveBarbeiro,
    contactCliente,
    copyToClipboard,
  } = useAgenda();

  const cliente: Content = JSON.parse(
    localStorage.getItem('@rasg:cliente') || '',
  );
  const whatsAppNumber = cliente?.cliente.nmTelefone;
  const agendamentoId = cliente?.cdAgendamento;

  return (
    <div className={styles.wrapper} data-theme={theme}>
      <h2>Opções adicionais</h2>

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

        <CopyToClipboard
          text={String(cliente?.cdAgendamento)}
          onCopy={() => copyToClipboard()}
        >
          <div className={styles.copyClipboard}>
            <BiCopy size={20} />№{' '}
            {get8caracters(String(cliente?.cdAgendamento))}
          </div>
        </CopyToClipboard>

        <button
          className={styles.cancel}
          type="button"
          disabled={
            verificaHorarioCancelamento() ||
            cliente.situacaoAgendamento.deSituacaoAgendamento === 'EXECUTADO'
          }
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
