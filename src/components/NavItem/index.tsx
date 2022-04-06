import { useState } from 'react';

import { NavItemProps } from 'types/IComponents';

import styles from './NavItem.module.scss';

export function NavItem(props: NavItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles.navItem}>
      <a
        href="#"
        className={styles.iconButton}
        onClick={() => (props.children ? setOpen(!open) : props.onClick && props.onClick())}
      >
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}
