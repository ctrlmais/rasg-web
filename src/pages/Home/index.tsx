import { Barbeiro } from 'pages/Barbeiro';
import { Cliente } from 'pages/Cliente';

import { Header } from 'components/Header';
import { VerificacaoOcupacao } from 'components/Verificacao';

import { useTheme } from 'contexts/Theme';
import { useUser } from 'contexts/User';

import { useAuth } from 'hooks/useAuth';

import { css } from 'styles/calendar.styles';

import styles from './Home.module.scss';

export function Home() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { verificaLoginGoogleEOcupacao, verificaOcupacao } = useUser();

  return (
    <div className={styles.home} data-theme={theme}>
      <style>{css}</style>
      <Header
        logo
        default
        name={user?.user_metadata.name || user?.email}
        profile={user?.user_metadata.avatar_url || user?.user_metadata.picture}
        avatar={user?.user_metadata.name}
      />

      <div className={styles.container}>
        {verificaLoginGoogleEOcupacao() && <VerificacaoOcupacao />}
        {verificaOcupacao('cliente') && <Cliente />}
        {verificaOcupacao('barbeiro') && <Barbeiro />}
      </div>
    </div>
  );
}
