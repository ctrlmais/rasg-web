import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import logoDark from 'assets/Logo_dark.png';
import logo from 'assets/Logo.png';
import { NavBarProps } from 'types/IComponents';

import { useTheme } from 'contexts/Theme';

import styles from './Navbar.module.scss';

export function Navbar(props: NavBarProps) {
  const { theme } = useTheme();

  const navigate = useNavigate();
  return (
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
          src={theme === 'light' ? logoDark : logo}
          alt="Logo"
          className={styles.logo}
          onClick={() => {
            navigate('/');
          }}
        />
      )}
      <ul className={styles.navbarNav}>{props.children}</ul>
    </nav>
  );
}
