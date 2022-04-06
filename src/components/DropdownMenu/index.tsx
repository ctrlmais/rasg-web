import { CSSTransition } from 'react-transition-group';

import Avvvatars from 'avvvatars-react';

import { DropdownItem } from 'components/DropdownItem';

import { useAuth } from 'hooks/useAuth';
import { useDropdown } from 'hooks/useDropdown';

import styles from './DropdownMenu.module.scss';

export function DropdownMenu() {
  const { user } = useAuth();
  const { activeMenu, dropdownRef, calcHeight, menuHeight, photo } = useDropdown();

  return (
    <div className={styles.dropdown} style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className={styles.menu}>
          <DropdownItem link="/profile">
            {user?.user_metadata.avatar_url === undefined && photo === '' ? (
              <div className={styles.imgProfile}>
                <Avvvatars value={user?.user_metadata.name || ''} size={30} />
              </div>
            ) : (
              <img
                src={user?.user_metadata.avatar_url || user?.user_metadata.picture}
                alt={user?.user_metadata.name}
                className={styles.imgProfile}
              />
            )}
            Meu Perfil
          </DropdownItem>

          <DropdownItem logout>Sair</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}