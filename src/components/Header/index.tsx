import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { RiArrowDownSFill } from 'react-icons/ri';

import { HeaderProps } from 'types/ComponentsProps';

import { DropdownMenu } from 'components/DropdownMenu';
import { Navbar } from 'components/Navbar';
import { NavItem } from 'components/NavItem';

import { useTheme } from 'contexts/Theme';

export function Header({ logo, back, path }: HeaderProps) {
  const { theme, switchTheme } = useTheme();

  return (
    <Navbar logo={logo} back={back} path={path}>
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
