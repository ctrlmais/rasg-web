import { IoBug } from 'react-icons/io5';
// import { Link } from 'react-router-dom';

import styles from './FloatingButton.module.scss';

interface Props {
  onClick?: () => void;
}

export function FloatingButton({ onClick }: Props) {
  return (
    <div className={styles.floating} onClick={onClick}>
      <IoBug color="#fff" size={24} />
    </div>
  );
}
