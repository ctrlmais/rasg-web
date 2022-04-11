import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

import styles from './ButtonTop.module.scss';

export function ButtonTopPage() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 400 && !isActive) {
        setIsActive(true);
      }

      if (window.scrollY <= 400 && isActive) {
        setIsActive(false);
      }
    });
  }, [isActive]);

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div
      className={`${styles.floatingButton} ${isActive ? styles.floatingButton : styles.floatingButtonNone}`}
      onClick={() => {
        handleScrollToTop();
      }}
    >
      <FiArrowUp />
    </div>
  );
}
