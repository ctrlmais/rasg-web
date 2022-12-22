import { Header } from 'components/Header';
import { ReaderQrCode } from 'components/QrReader';

import { useTheme } from 'contexts/Theme';

import styles from './Camera.module.scss';

export function Camera() {
  const { theme } = useTheme();

  return (
    <div className={styles.home} data-theme={theme}>
      <Header logo path="/scanner" />

      <div className={styles.container}>
        <h2>Câmera</h2>
      </div>
      <div className={styles.containerCamera}>
        <ReaderQrCode />
      </div>
    </div>
  );
}
