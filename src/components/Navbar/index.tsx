import { IoArrowBackOutline } from 'react-icons/io5';
import { RiMenuLine } from 'react-icons/ri';
import { useNavigate, Link } from 'react-router-dom';

import RASGdark from 'assets/rasg_dark.png';
import RASG from 'assets/rasg.png';
import { NavBarProps } from 'types/ComponentsProps';

import { MenuHamburguer } from 'components/MenuHamburguer';
import { NavItem } from 'components/NavItem';

import { useTheme } from 'contexts/Theme';

import { usePerfil } from 'hooks/usePerfil';

import styles from './Navbar.module.scss';

export function Navbar({ children, back, logo, path }: NavBarProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isBarbeiro, isCliente, isAdmin } = usePerfil();

  function verifyPath(pathname: string) {
    if (pathname === path) {
      return true;
    }
    return false;
  }

  return (
    <nav className={styles.navbar}>
      {back && (
        <IoArrowBackOutline
          size={24}
          className={styles.icon}
          onClick={() => {
            navigate('/');
          }}
        />
      )}
      {logo && (
        <img
          src={theme === 'light' ? RASGdark : RASG}
          alt="Logo"
          className={styles.logo}
          onClick={() => {
            navigate('/');
          }}
        />
      )}

      <div className={styles.menuHamburguer}>
        <NavItem icon={<RiMenuLine />}>
          <MenuHamburguer />
        </NavItem>
      </div>

      <div className={styles.menu}>
        <div className={styles.links}>
          <div className={styles.linkMenu}>
            <Link to="/" className={styles.active}>
              Início
            </Link>
            {verifyPath('/') && <div className={styles.statusbar} />}
          </div>
          <div className={styles.linkMenu}>
            <Link to="/history" className={styles.active}>
              Histórico
            </Link>
            {verifyPath('/history') && <div className={styles.statusbar} />}
          </div>

          {isBarbeiro && (
            <div className={styles.linkMenu}>
              <Link to="/horarios" className={styles.active}>
                Horários
              </Link>
              {verifyPath('/horarios') && <div className={styles.statusbar} />}
            </div>
          )}

          {(isCliente || isAdmin) && (
            <div className={styles.linkMenu}>
              <Link to="/tickets" className={styles.active}>
                Tickets
              </Link>
              {verifyPath('/ticket') && <div className={styles.statusbar} />}
            </div>
          )}
        </div>
      </div>
      <ul className={styles.navbarNav}>{children}</ul>
    </nav>
  );
}
