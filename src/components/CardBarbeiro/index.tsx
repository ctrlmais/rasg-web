import { useEffect, useState } from 'react';

import { UserMetadata } from 'types/IContext';

import { getPhoto } from 'services/get/photo';

import styles from './CardBarbeiro.module.scss';

type Props = {
  barbeiro: UserMetadata | undefined;
  onClick: () => void;
};

export function CardBarbeiro({ barbeiro, onClick }: Props) {
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
    <div className={styles.card} onClick={onClick} key={barbeiro?.id}>
      <div className={styles.containerImg}>
        <img src={photo || barbeiro?.avatar_url || barbeiro?.picture} alt={barbeiro?.nome} />
      </div>
      <div className={styles.containerInfo}>
        <h2 className={styles.title}>{name || barbeiro?.nome}</h2>
        <strong>aaa</strong>
        <strong>aaa</strong>
      </div>
    </div>
  );
}
