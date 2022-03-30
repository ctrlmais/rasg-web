import { IoMdLogOut, IoMdMoon, IoMdSunny } from 'react-icons/io';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import logo from 'assets/Logo.png';
import Avvvatars from 'avvvatars-react';
import { HeaderProps } from 'types/IComponents';

import { useTheme } from 'contexts/Theme';

import { useAuth } from 'hooks/useAuth';

import styles from './Header.module.scss';

export function Header(props: HeaderProps) {
  const navigate = useNavigate();
  const { theme, switchTheme } = useTheme();
  const { handleLogout } = useAuth();

  return (
    <div className={styles.header}>
      {props.logo && <img src={logo} alt="Logo" className={styles.logo} />}
      <div className={styles.user}>
        {props.back && <IoArrowBackOutline size={32} className={styles.icon} onClick={() => navigate('/')} />}
        {props.default ? (
          <>
            {props.profile ? (
              <img src={props.profile} alt="Avatar" className={styles.avatar} />
            ) : (
              <Avvvatars value={props.avatar || ''} size={42} />
            )}
          </>
        ) : null}

        {props.name && (
          <div className={styles.bemVindo}>
            Bem vindo,
            <p
              onClick={() => {
                navigate('/profile');
              }}
            >
              {props.name}
            </p>
          </div>
        )}
      </div>
      <div
        onClick={() => {
          switchTheme();
        }}
      >
        {theme === 'light' ? (
          <IoMdMoon size={32} className={styles.icon} />
        ) : (
          <IoMdSunny size={32} className={styles.icon} />
        )}
      </div>
      <IoMdLogOut onClick={() => handleLogout()} size={32} className={styles.icon} />
    </div>
  );
}
