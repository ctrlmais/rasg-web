import { FiClock, FiScissors } from 'react-icons/fi';
import { IoTicketOutline } from 'react-icons/io5';
import { RiAdminLine, RiBugLine, RiHistoryLine } from 'react-icons/ri';
import { TbLogout } from 'react-icons/tb';
import { CSSTransition } from 'react-transition-group';

import Avvvatars from 'avvvatars-react';

import { DropdownItem } from 'components/DropdownItem';

import { useAuth } from 'hooks/useAuth';
import { useDropdown } from 'hooks/useDropdown';
import { usePerfil } from 'hooks/usePerfil';

import styles from './DropdownMenu.module.scss';

export function DropdownMenu() {
  const { user, handleLogout, profileAvatar } = useAuth();
  const { activeMenu, dropdownRef, calcHeight, menuHeight } = useDropdown();

  const { isAdmin, isBarbeiro, isCliente } = usePerfil();

  return (
    <div
      className={styles.dropdown}
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className={styles.menu}>
          <DropdownItem link="/profile">
            {profileAvatar ? (
              <img
                src={profileAvatar}
                alt={user?.nmUsuario}
                className={styles.imgProfile}
              />
            ) : (
              <div className={styles.imgProfile}>
                <Avvvatars value={user?.nmUsuario || ''} size={30} />
              </div>
            )}
            Meu Perfil
          </DropdownItem>

          {isAdmin && (
            <DropdownItem link="/admin" leftIcon={<RiAdminLine size={18} />}>
              Painel Admin
            </DropdownItem>
          )}
          {isBarbeiro && (
            <DropdownItem link="/schedules" leftIcon={<FiClock size={18} />}>
              Atualizar horários
            </DropdownItem>
          )}
          {isBarbeiro && (
            <DropdownItem link="/services" leftIcon={<FiScissors size={18} />}>
              Adicionar serviços
            </DropdownItem>
          )}
          {isBarbeiro && (
            <DropdownItem
              link="/validate"
              leftIcon={<IoTicketOutline size={18} />}
            >
              Validar Horário
            </DropdownItem>
          )}
          {isCliente && (
            <DropdownItem
              link="/history"
              leftIcon={<RiHistoryLine size={18} />}
            >
              Histórico
            </DropdownItem>
          )}
          <DropdownItem link="/bug" leftIcon={<RiBugLine size={18} />}>
            Relatar um bug
          </DropdownItem>

          <DropdownItem
            onClick={() => handleLogout()}
            logout
            leftIcon={<TbLogout size={18} />}
          >
            Sair
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
