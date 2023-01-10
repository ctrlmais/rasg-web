import { useEffect, useRef, useState } from 'react';

import { NavItemProps } from 'types/ComponentsProps';

import styles from './NavItem.module.scss';

export function NavItem({ icon, children, onClick }: NavItemProps) {
  const [open, setOpen] = useState(false);

  function useOutsideClick(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  function OutsideClick({ children }: any) {
    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    return (
      <div className={styles.navItem} ref={wrapperRef}>
        {children}
      </div>
    );
  }

  return (
    <OutsideClick>
      <li className={styles.navItem}>
        <div
          className={styles.iconButton}
          onClick={() => (children ? setOpen(!open) : onClick && onClick())}
        >
          {icon}
        </div>

        {open && children}
      </li>
    </OutsideClick>
  );
}
