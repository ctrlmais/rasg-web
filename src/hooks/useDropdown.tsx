import { useEffect, useRef, useState } from 'react';

import { getPhoto } from 'services/get/photo';

import { useAuth } from './useAuth';

export function useDropdown() {
  const { user } = useAuth();
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState<any>(null);
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const dropdownRef = useRef<any>(null);

  function calcHeight(el: { offsetHeight: any }) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 30);
  }, []);

  async function getPhotoUser(id: string) {
    const { data, error, status } = await getPhoto(id);

    if (error) {
      switch (status) {
        default:
          throw new Error('Erro ao buscar informações do usuário');
      }
    }

    if (!data) return;

    setPhoto(data[0].j[0].src);
    setName(data[0].j[0].name);
  }

  useEffect(() => {
    getPhotoUser(user?.id || '');
  }, []);

  return {
    activeMenu,
    setActiveMenu,
    menuHeight,
    setMenuHeight,
    dropdownRef,
    calcHeight,
    photo,
    name,
  };
}
