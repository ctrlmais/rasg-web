import { useEffect, useRef, useState } from 'react';

import { NavItemProps } from 'types/IComponents';

import styles from './NavItem.module.scss';

export function NavItem(props: NavItemProps) {
  const [open, setOpen] = useState(false);

  function useOutsideClick(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
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
        <a
          href="#"
          className={styles.iconButton}
          onClick={() =>
            props.children ? setOpen(!open) : props.onClick && props.onClick()
          }
        >
          {props.icon}
        </a>

        {open && props.children}
      </li>
    </OutsideClick>
  );
}
