import { FiCheck } from 'react-icons/fi';

import { SpinnerCircular } from 'spinners-react';
import { UserMetadata } from 'types/IContext';

import { CardBarbeiro } from 'components/CardBarbeiro';
import { Header } from 'components/Header';

import { useTheme } from 'contexts/Theme';

import { useAdmin } from 'hooks/useAdmin';

import styles from './Admin.module.scss';

export function Admin() {
  const { theme } = useTheme();
  const { loading, aproveBarbeiro, barbeiros } = useAdmin();

  return (
    <>
      <div className={styles.home} data-theme={theme}>
        <Header logo />
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            {barbeiros.length > 0 ? (
              <h2 className={styles.titleHome}>Barbeiros para serem aprovados</h2>
            ) : (
              <h2 className={styles.titleHome}>Não há barbeiros para serem aprovados.</h2>
            )}
          </div>

          <div className={styles.containerList}>
            {loading ? (
              <SpinnerCircular color="#ff9000" size={64} />
            ) : (
              <>
                {barbeiros.length > 0 &&
                  barbeiros.map((barbeiro: UserMetadata) => (
                    <div className={styles.containerBarber}>
                      <CardBarbeiro key={barbeiro.id} barbeiro={barbeiro} />
                      <button
                        className={styles.button}
                        onClick={() => {
                          console.log('click');
                          aproveBarbeiro(barbeiro?.id);
                        }}
                      >
                        <FiCheck color="#FFF" size={28} style={{ marginTop: '6px' }} />
                      </button>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
