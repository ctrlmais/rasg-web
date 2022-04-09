import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import logo from 'assets/Logo.png';
import { NavBarProps } from 'types/IComponents';

import styles from './Navbar.module.scss';

export function Navbar(props: NavBarProps) {
  const navigate = useNavigate();
  return (
    <>
      <nav className={styles.navbar}>
        {props.back && (
          <IoArrowBackOutline
            size={24}
            className={styles.icon}
            onClick={() => {
              navigate('/');
            }}
          />
        )}
        {props.logo && (
          <img
            src={logo}
            alt="Logo"
            className={styles.logo}
            onClick={() => {
              navigate('/');
            }}
          />
        )}
        <ul className={styles.navbarNav}>{props.children}</ul>
      </nav>
    </>
  );
}
