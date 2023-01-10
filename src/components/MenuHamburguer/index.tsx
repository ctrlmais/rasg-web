import { FiClock } from 'react-icons/fi';
import { IoTicketOutline } from 'react-icons/io5';
import { RiHistoryLine, RiHome2Line } from 'react-icons/ri';
import { CSSTransition } from 'react-transition-group';

import { DropdownItem } from 'components/DropdownItem';

import { useDropdown } from 'hooks/useDropdown';
import { usePerfil } from 'hooks/usePerfil';

import styles from './MenuHamburguer.module.scss';

export function MenuHamburguer() {
  const { isBarbeiro, isCliente } = usePerfil();
  const { activeMenu, dropdownRef, calcHeight, menuHeight } = useDropdown();

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
          <DropdownItem link="/" leftIcon={<RiHome2Line size={18} />}>
            Início
          </DropdownItem>

          <DropdownItem link="/history" leftIcon={<RiHistoryLine size={18} />}>
            Histórico
          </DropdownItem>

          {isBarbeiro && (
            <DropdownItem link="/schedules" leftIcon={<FiClock size={18} />}>
              Horários
            </DropdownItem>
          )}
          {isCliente && (
            <DropdownItem
              link="/tickets"
              leftIcon={<IoTicketOutline size={18} />}
            >
              Ticket
            </DropdownItem>
          )}
        </div>
      </CSSTransition>
    </div>
  );
}
