import { OcupacaoProps } from 'types/IComponents';

import { useAuth } from 'hooks/useAuth';

import styles from './Ocupacao.module.scss';

export function Ocupacao(props: OcupacaoProps) {
  const { ocupacao, setOcupacao } = useAuth();

  return (
    <div className={styles.ocupacao}>
      {ocupacao === 'CLIENTE' ? (
        <div className={styles.active} onClick={() => setOcupacao('CLIENTE')}>
          <p>{props.cliente ? props?.cliente : 'Sou Cliente'}</p>
        </div>
      ) : (
        <div onClick={() => setOcupacao('CLIENTE')} className={styles.none}>
          <p>{props.cliente ? props?.cliente : 'Sou Cliente'}</p>
        </div>
      )}

      {ocupacao === 'GERENCIADOR' ? (
        <div
          className={styles.active}
          onClick={() => setOcupacao('GERENCIADOR')}
        >
          <p>{props.barbeiro ? props?.barbeiro : 'Sou Barbeiro'}</p>
        </div>
      ) : (
        <div onClick={() => setOcupacao('GERENCIADOR')} className={styles.none}>
          <p>{props.barbeiro ? props?.barbeiro : 'Sou Barbeiro'}</p>
        </div>
      )}
    </div>
  );
}
