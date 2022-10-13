import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { RiArrowDownSFill } from 'react-icons/ri';

import { HeaderProps } from 'types/IComponents';

import { DropdownMenu } from 'components/DropdownMenu';
import { Navbar } from 'components/Navbar';
import { NavItem } from 'components/NavItem';

import { useTheme } from 'contexts/Theme';

export function Header(props: HeaderProps) {
  const { theme, switchTheme } = useTheme();

  return (
    <Navbar logo={props.logo} back={props.back} path={props.path}>
      <NavItem
        onClick={() => {
          switchTheme();
        }}
        icon={theme === 'light' ? <IoMdMoon /> : <IoMdSunny />}
      />

      <NavItem icon={<RiArrowDownSFill />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}
