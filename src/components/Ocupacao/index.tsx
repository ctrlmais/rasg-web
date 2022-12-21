import { OcupacaoProps } from 'types/ComponentsProps';

import { useAuth } from 'hooks/useAuth';

import styles from './Ocupacao.module.scss';

export function Ocupacao({ cliente, barbeiro }: OcupacaoProps) {
  const { ocupacao, setOcupacao } = useAuth();

  return (
    <div className={styles.ocupacao}>
      {ocupacao === 'CLIENTE' ? (
        <div className={styles.active} onClick={() => setOcupacao('CLIENTE')}>
          <p>{cliente || 'Sou Cliente'}</p>
        </div>
      ) : (
        <div onClick={() => setOcupacao('CLIENTE')} className={styles.none}>
          <p>{cliente || 'Sou Cliente'}</p>
        </div>
      )}

      {ocupacao === 'GERENCIADOR' ? (
        <div
          className={styles.active}
          onClick={() => setOcupacao('GERENCIADOR')}
        >
          <p>{barbeiro || 'Sou Barbeiro'}</p>
        </div>
      ) : (
        <div onClick={() => setOcupacao('GERENCIADOR')} className={styles.none}>
          <p>{barbeiro || 'Sou Barbeiro'}</p>
        </div>
      )}
    </div>
  );
}
