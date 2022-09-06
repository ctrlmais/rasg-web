import MaintenanceImage from 'assets/maintenance.svg';

import { useTheme } from 'contexts/Theme';

import styles from './Maintenance.module.scss';

export function Maintenance() {
  const { theme } = useTheme();

  return (
    <div className={styles.home} data-theme={theme}>
      <div className={styles.container}>
        <img
          src={MaintenanceImage}
          className={styles.image}
          alt="Maintenance"
        />

        <div className={styles.manutencao}>
          <h2>
            Ops{' '}
            <span role="img" aria-label="emoji">
              🚧
            </span>
            <br />
            Tivemos um pequeno probleminha e tivemos que fazer uma manutenção.
            <br />
            Em breve estaremos de volta!
          </h2>
        </div>
      </div>
    </div>
  );
}
