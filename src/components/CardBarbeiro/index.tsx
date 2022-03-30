import { UserMetadata } from 'types/IContext';

import styles from './CardBarbeiro.module.scss';

type Props = {
  barbeiro: UserMetadata | undefined;
  onClick: () => void;
};

export function CardBarbeiro({ barbeiro, onClick }: Props) {
  return (
    <div className={styles.card} onClick={onClick} key={barbeiro?.id}>
      <div className={styles.containerImg}>
        <img src={barbeiro?.avatar_url || barbeiro?.picture} alt={barbeiro?.nome} />
      </div>
      <div className={styles.containerInfo}>
        <h2>{barbeiro?.nome}</h2>
        <strong>aaa</strong>
        <strong>aaa</strong>
      </div>
    </div>
  );
}
