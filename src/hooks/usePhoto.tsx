import { useEffect, useState } from 'react';

import { getPhoto } from 'services/get/photo';

export function usePhoto(idUser: string) {
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    async function getPhotoUser(id: string) {
      const { data, error, status } = await getPhoto(id);

      if (error) {
        switch (status) {
          default:
            return;
        }
      }

      if (!data) return;
      if (!data[0].j) return;
      if (!data[0].j[0]) return;

      setPhoto(data[0].j[0].src);
      setName(data[0].j[0].name);
    }

    getPhotoUser(idUser);
  }, []);

  return {
    photo,
    name,
  };
}
