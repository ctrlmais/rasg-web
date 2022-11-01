import { Ring } from '@uiball/loaders';

import { Header } from 'components/Header';
import { Ticket } from 'components/Ticket';

import { useTheme } from 'contexts/Theme';

import { useTicket } from 'hooks/useTicket';

import styles from './Tickets.module.scss';

export function Tickets() {
  const { theme } = useTheme();
  const { tickets, loading } = useTicket();

  return (
    <div className={styles.home} data-theme={theme}>
      <Header logo path="/ticket" />
      <div className={styles.container}>
        <h2 className={styles.title}>Seus Tickets</h2>

        <div className={styles.containerList}>
          <div className={styles.containerTicketList}>
            {loading ? (
              <Ring speed={2} lineWeight={5} color="#ff9000" size={64} />
            ) : (
              <>
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <div
                      className={styles.containerTicket}
                      key={ticket.cdAgendamento}
                    >
                      <Ticket
                        enable
                        key={ticket.cdAgendamento}
                        cliente={ticket}
                      />
                    </div>
                  ))
                ) : (
                  <div>
                    <h2>Você ainda não tem nenhum ticket 🙁</h2>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
