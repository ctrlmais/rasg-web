import { SpinnerCircular } from 'spinners-react';

import { Header } from 'components/Header';
import { Ticket } from 'components/Ticket';

import { useTheme } from 'contexts/Theme';

import { useTicket } from 'hooks/useTicket';

import styles from './MyTicket.module.scss';

export function MyTicket() {
  const { theme } = useTheme();
  const { loading, cliente } = useTicket();

  return (
    <>
      <div className={styles.home} data-theme={theme}>
        <Header back />

        <div className={styles.container}>
          <h2>Apresente esse ticket para o seu barbeiro</h2>
          {loading ? <SpinnerCircular color="#ff9000" size={64} /> : <Ticket cliente={cliente} />}
        </div>
      </div>
    </>
  );
}
