import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DropdownItemProps } from 'types/IComponents';

import { useDropdown } from 'hooks/useDropdown';

import styles from './DropdownItem.module.scss';

export function DropdownItem(props: DropdownItemProps) {
  const { setActiveMenu, setMenuHeight, dropdownRef } = useDropdown();

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 30);
  }, []);

  return (
    <div onClick={props.onClick}>
      <Link
        to={props.link || ''}
        className={styles.menuItem}
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className={styles.iconButton}>{props.leftIcon}</span>
        {props.children}
        <span className={styles.iconRight}>{props.rightIcon}</span>
      </Link>
    </div>
  );
}
