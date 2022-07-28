import { useEffect, useRef, useState } from 'react';

export function useDropdown() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState<any>(null);
  const dropdownRef = useRef<any>(null);

  function calcHeight(el: { offsetHeight: any }) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 30);
  }, []);

  return {
    activeMenu,
    setActiveMenu,
    menuHeight,
    setMenuHeight,
    dropdownRef,
    calcHeight,
  };
}
