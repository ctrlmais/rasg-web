import { SpinnerCircular } from 'spinners-react';
import { ClienteMetadata } from 'types/IContext';

import { Alert } from 'components/Alert';
import { Button } from 'components/Button';
import ComponentToPrint from 'components/ComponentToPrint';
import { Header } from 'components/Header';
import { Ticket } from 'components/Ticket';

import { useTheme } from 'contexts/Theme';

import { useTicket } from 'hooks/useTicket';

import styles from './MyTicket.module.scss';

export function MyTicket() {
  const { theme } = useTheme();
  const { loading, cliente, componentToPrintRef, handleClickPrint, cancelarAgendamento, verificaHorarioCancelamento } =
    useTicket();

  return (
    <>
      <div className={styles.home} data-theme={theme}>
        <Header back />

        <div className={styles.container}>
          {verificaHorarioCancelamento(cliente as ClienteMetadata) && (
            <div className={styles.containerAlert}>
              <Alert title="Você só cancelar o agendamento 1 hora antes do seu horário" warning />
            </div>
          )}
          <h2>Apresente esse ticket para o seu barbeiro</h2>
          {loading ? (
            <SpinnerCircular color="#ff9000" size={64} />
          ) : (
            <>
              <ComponentToPrint ref={componentToPrintRef}>
                <Ticket cliente={cliente} />
              </ComponentToPrint>
            </>
          )}
          <div className={styles.containerButton}>
            <Button
              type="button"
              onClick={() => {
                handleClickPrint();
              }}
            >
              Salvar ticket
            </Button>
            <Button
              type="button"
              disabled={verificaHorarioCancelamento(cliente as ClienteMetadata)}
              style={{
                backgroundColor: '#CA0B00',
                color: '#FFF',
              }}
              onClick={() => {
                cancelarAgendamento(cliente?.id || '');
              }}
            >
              Cancelar agendamento
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
