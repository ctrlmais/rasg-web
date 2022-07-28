import Avvvatars from 'avvvatars-react';
import { CardBarbeiroProps } from 'types/IComponents';

import { usePhoto } from 'hooks/usePhoto';

import styles from './CardBarbeiroSelect.module.scss';

export function CardBarbeiroSelected(props: CardBarbeiroProps) {
  const { photo, name } = usePhoto(props.barbeiro?.id || '');

  return (
    <div key={props.barbeiro?.id} className={styles.containerCard}>
      <div className={styles.spacing}>
        {photo === '' &&
        (props.barbeiro?.avatar_url === null ||
          props.barbeiro?.avatar_url === undefined) ? (
          <Avvvatars value={props.barbeiro?.nome || ''} size={38} />
        ) : (
          <img
            src={photo || props.barbeiro?.avatar_url || props.barbeiro?.picture}
            alt={props.barbeiro?.nome}
            className={styles.img}
          />
        )}
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.textTitle}>{name || props.barbeiro?.nome}</h2>
      </div>
    </div>
  );
}
