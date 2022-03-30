import barberImg from 'assets/barber-404.svg';

import { Button } from 'components/Button';

import { useTheme } from 'contexts/Theme';

import styles from './NotFound.module.scss';

export function NotFound() {
  const { theme } = useTheme();

  return (
    <div className={styles.home} data-theme={theme}>
      <h1>Erro 404</h1>
      <img src={barberImg} alt="Barbeiro cortando cabelo" />
      <p>Ops, parece que você está procurando por algo que não existe.</p>

      <br />

      <Button type="button" onClick={() => window.location.replace('/')}>
        Voltar para a página inicial
      </Button>
    </div>
  );
}
