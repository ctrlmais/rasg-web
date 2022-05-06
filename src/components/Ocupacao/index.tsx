import { OcupacaoProps } from 'types/IComponents';

import { useAuth } from 'hooks/useAuth';

import styles from './Ocupacao.module.scss';

export function Ocupacao(props: OcupacaoProps) {
  const { ocupacao, setOcupacao } = useAuth();

  return (
    <div className={styles.ocupacao}>
      {ocupacao === 'cliente' ? (
        <div className={styles.active} onClick={() => setOcupacao('cliente')}>
          <p>{props.cliente ? props?.cliente : 'Sou Cliente'}</p>
        </div>
      ) : (
        <div onClick={() => setOcupacao('cliente')} className={styles.none}>
          <p>{props.cliente ? props?.cliente : 'Sou Cliente'}</p>
        </div>
      )}

      {ocupacao === 'barbeiro' ? (
        <div className={styles.active} onClick={() => setOcupacao('barbeiro')}>
          <p>{props.barbeiro ? props?.barbeiro : 'Sou Barbeiro'}</p>
        </div>
      ) : (
        <div onClick={() => setOcupacao('barbeiro')} className={styles.none}>
          <p>{props.barbeiro ? props?.barbeiro : 'Sou Barbeiro'}</p>
        </div>
      )}
    </div>
  );
}
