import changeDraw from 'assets/changeDraw.svg';

import { Button } from 'components/Button';

import { useTheme } from 'contexts/Theme';

import styles from './Maintenance.module.scss';

export function Maintenance() {
  const { theme } = useTheme();

  const url = window.location.href;

  return (
    <div className={styles.home} data-theme={theme}>
      <div className={styles.container}>
        <img src={changeDraw} className={styles.image} alt="Maintenance" />

        {url.includes('rasg') ? (
          <div className={styles.manutencao}>
            <h2>
              Seja bem-vindo ao <span>RASG</span>
              <span role="img" aria-label="emoji">
                😁
              </span>
              <br />
              Agora você pode acessar o sistema de forma mais rápida e fácil.
              <br />
              Entrando pelo site{' '}
              <a
                className={styles.link}
                href="https://www.rasg.com.br"
                target="_blank"
                rel="noreferrer"
              >
                www.rasg.com.br
              </a>{' '}
              ou {''}
              <a
                className={styles.link}
                href="https://app.rasg.com.br"
                target="_blank"
                rel="noreferrer"
              >
                app.rasg.com.br
              </a>
              <br />
              <br />
            </h2>
          </div>
        ) : (
          <div className={styles.manutencao}>
            <h2>
              Está quase tudo pronto
              <span role="img" aria-label="emoji">
                😁
              </span>
              <br />
              Mas já temos uma novidade para você! Agora somos{' '}
              <strong>RASG</strong>!
              <br />
              <br />
              <Button
                type="button"
                onClick={() =>
                  (window.location.href = 'https://app.rasg.com.br')
                }
              >
                Visite nosso novo site
              </Button>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
