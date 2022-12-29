import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { HeaderProps } from 'types/ComponentsProps';

import { Button } from 'components/Button';
import { DropdownMenu } from 'components/DropdownMenu';
import { Navbar } from 'components/Navbar';
import { NavItem } from 'components/NavItem';

import { useTheme } from 'contexts/Theme';

import { useAuth } from 'hooks/useAuth';

import styles from './Header.module.scss';

export function Header({ logo, back, path }: HeaderProps) {
  const { theme, switchTheme } = useTheme();
  const { signed } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar logo={logo} back={back} path={path}>
      <NavItem
        onClick={() => {
          switchTheme();
        }}
        icon={theme === 'light' ? <IoMdMoon /> : <IoMdSunny />}
      />

      {signed ? (
        <NavItem icon={<RiArrowDownSFill />}>
          <DropdownMenu />
        </NavItem>
      ) : (
        <div className={styles.buttonLoginContainer}>
          <h3
            onClick={() => {
              navigate('/');
            }}
          >
            Login
          </h3>

          <Button
            type="button"
            style={{
              height: '1.85rem',
              width: '8rem',
              borderRadius: '0.625rem',
            }}
            onClick={() => {
              navigate('/register');
            }}
          >
            Cadastre-se
          </Button>
        </div>
      )}
    </Navbar>
  );
}
