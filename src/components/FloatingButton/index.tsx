import { IoBug } from 'react-icons/io5';

import { FloatingButtonProps } from 'types/IComponents';

import styles from './FloatingButton.module.scss';

export function FloatingButton(props: FloatingButtonProps) {
  return (
    <div className={styles.floating} onClick={props.onClick}>
      <IoBug color="#fff" size={24} />
    </div>
  );
}
