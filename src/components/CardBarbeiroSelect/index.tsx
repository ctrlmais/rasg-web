import { useEffect, useState } from 'react';

import { UserMetadata } from 'types/IContext';

import { getPhoto } from 'services/get/photo';

import styles from './CardBarbeiroSelect.module.scss';

type Props = {
  barbeiro: UserMetadata | undefined;
};
export function CardBarbeiroSelected({ barbeiro }: Props) {
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');

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
    if (barbeiro) {
      getPhotoUser(barbeiro.id);
    }
  }, [barbeiro]);

  return (
    <div key={barbeiro?.id} className={styles.containerCard}>
      <div className={styles.spacing}>
        <img src={photo || barbeiro?.avatar_url || barbeiro?.picture} alt={barbeiro?.nome} className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.textTitle}>{name || barbeiro?.nome}</h2>
      </div>
    </div>
  );
}
