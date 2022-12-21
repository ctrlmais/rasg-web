import Avvvatars from 'avvvatars-react';
import { CardBarbeiroProps } from 'types/ComponentsProps';

import styles from './CardBarbeiroSelect.module.scss';

export function CardBarbeiroSelected({ barbeiro }: CardBarbeiroProps) {
  return (
    <div key={barbeiro?.cdUsuario} className={styles.containerCard}>
      <div className={styles.spacing}>
        <Avvvatars value={barbeiro?.nmUsuario || ''} size={38} />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.textTitle}>{barbeiro?.nmUsuario}</h2>
      </div>
    </div>
  );
}
