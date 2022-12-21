import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DropdownItemProps } from 'types/ComponentsProps';

import { useDropdown } from 'hooks/useDropdown';

import styles from './DropdownItem.module.scss';

export function DropdownItem({
  children,
  goToMenu,
  leftIcon,
  link,
  logout,
  onClick,
  rightIcon,
}: DropdownItemProps) {
  const { setActiveMenu, setMenuHeight, dropdownRef } = useDropdown();

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 30);
  }, []);

  return (
    <div onClick={onClick}>
      <Link
        to={link || ''}
        className={styles.menuItem}
        onClick={() => goToMenu && setActiveMenu(goToMenu)}
      >
        <span className={styles.iconButton}>{leftIcon}</span>
        {children}
        <span className={styles.iconRight}>{rightIcon}</span>
      </Link>
    </div>
  );
}
