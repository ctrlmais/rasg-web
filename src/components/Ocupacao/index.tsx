import { useAuth } from 'hooks/useAuth';

import styles from './Ocupacao.module.scss';

export function Ocupacao() {
  const { ocupacao, setOcupacao } = useAuth();

  return (
    <div className={styles.ocupacao}>
      {ocupacao === 'cliente' ? (
        <div className={styles.active} onClick={() => setOcupacao('cliente')}>
          <p>Sou cliente</p>
        </div>
      ) : (
        <div onClick={() => setOcupacao('cliente')} className={styles.none}>
          <p>Sou cliente</p>
        </div>
      )}

      {ocupacao === 'barbeiro' ? (
        <div className={styles.active} onClick={() => setOcupacao('barbeiro')}>
          <p>Sou barbeiro</p>
        </div>
      ) : (
        <div onClick={() => setOcupacao('barbeiro')} className={styles.none}>
          <p>Sou barbeiro</p>
        </div>
      )}
    </div>
  );
}
