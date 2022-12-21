import { Barbeiro } from 'pages/Barbeiro';
import { Cliente } from 'pages/Cliente';

import { ButtonTopPage } from 'components/ButtonTop';
import { Header } from 'components/Header';

import { useTheme } from 'contexts/Theme';
import { useUser } from 'contexts/User';

import { css } from 'styles/calendar.styles';

import styles from './Home.module.scss';

export function Home() {
  const { theme } = useTheme();
  const { verificaOcupacao } = useUser();

  return (
    <div className={styles.home} data-theme={theme}>
      <style>{css}</style>
      <ButtonTopPage />
      <Header logo path="/" />

      <div className={styles.container}>
        {verificaOcupacao('ADMINISTRADOR') && <Cliente />}
        {verificaOcupacao('CLIENTE') && <Cliente />}
        {verificaOcupacao('GERENCIADOR') && <Barbeiro />}
      </div>
    </div>
  );
}
