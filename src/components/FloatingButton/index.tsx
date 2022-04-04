import { IoBug } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import styles from './FloatingButton.module.scss';

export function FloatingButton() {
  return (
    <Link to="/report-bug" className={styles.floating}>
      <IoBug color="#fff" size={24} />
    </Link>
  );
}
