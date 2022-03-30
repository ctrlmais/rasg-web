import { useAuth } from 'hooks/useAuth';

import styles from './Ocupacao.module.scss';

export function Ocupacao() {
  const { ocupacao, setOcupacao } = useAuth();

  return (
    <div className={styles.ocupacao}>
      {ocupacao === 'cliente' ? (
        <p className={styles.active} onClick={() => setOcupacao('cliente')}>
          Sou cliente
        </p>
      ) : (
        <p onClick={() => setOcupacao('cliente')}>Sou cliente</p>
      )}

      {ocupacao === 'barbeiro' ? (
        <p className={styles.active} onClick={() => setOcupacao('barbeiro')}>
          Sou barbeiro
        </p>
      ) : (
        <p onClick={() => setOcupacao('barbeiro')}>Sou barbeiro</p>
      )}
    </div>
  );
}
