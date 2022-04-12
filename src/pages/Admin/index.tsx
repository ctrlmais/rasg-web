import { FiCheck, FiSlash } from 'react-icons/fi';

import { SpinnerCircular } from 'spinners-react';
import { UserMetadata } from 'types/IContext';

import { CardBarbeiro } from 'components/CardBarbeiro';
import { Header } from 'components/Header';

import { useTheme } from 'contexts/Theme';

import { useAdmin } from 'hooks/useAdmin';

import styles from './Admin.module.scss';

export function Admin() {
  const { theme } = useTheme();
  const { loading, aproveBarbeiro, barbeiros, barbeirosAprovados, disabledBarbeiro } = useAdmin();

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
                    <div className={styles.containerBarber} key={barbeiro.id}>
                      <CardBarbeiro key={barbeiro.id} barbeiro={barbeiro} />
                      <button
                        className={styles.button}
                        onClick={() => {
                          aproveBarbeiro(barbeiro?.id);
                        }}
                      >
                        <FiCheck color="#FFF" size={18} style={{ marginTop: '6px' }} />
                      </button>
                    </div>
                  ))}
              </>
            )}
          </div>
          <div className={styles.titleContainer}>
            {barbeirosAprovados.length > 0 ? (
              <h2 className={styles.titleHome}>Barbeiros para serem desativados</h2>
            ) : (
              <h2 className={styles.titleHome}>Não há barbeiros para serem desativados.</h2>
            )}
          </div>

          <div className={styles.containerList}>
            {loading ? (
              <SpinnerCircular color="#ff9000" size={64} />
            ) : (
              <>
                {barbeirosAprovados.length > 0 &&
                  barbeirosAprovados.map((barbeiro: UserMetadata) => (
                    <div className={styles.containerBarber} key={barbeiro.id}>
                      <CardBarbeiro key={barbeiro.id} barbeiro={barbeiro} />
                      <button
                        style={{
                          backgroundColor: '#CA0B00',
                        }}
                        className={styles.button}
                        onClick={() => {
                          disabledBarbeiro(barbeiro?.id);
                        }}
                      >
                        <FiSlash color="#FFF" size={18} style={{ marginTop: '6px' }} />
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
