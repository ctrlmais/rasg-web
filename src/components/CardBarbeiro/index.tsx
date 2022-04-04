import { useEffect, useState } from 'react';
import { BsCalendar, BsClock } from 'react-icons/bs';

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
        <strong className={styles.info}>
          <BsCalendar color="#FF9000" size={16} style={{ marginRight: '12px' }} />
          Segunda à Domingo
        </strong>
        <strong className={styles.info}>
          <BsClock color="#FF9000" size={16} style={{ marginRight: '12px' }} />
          8h às 22h
        </strong>
      </div>
    </div>
  );
}
