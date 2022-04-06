import { useEffect, useState } from 'react';
import { BsCalendar, BsClock } from 'react-icons/bs';

import { CardBarbeiroProps } from 'types/IComponents';

import { getPhoto } from 'services/get/photo';

import styles from './CardBarbeiro.module.scss';

export function CardBarbeiro(props: CardBarbeiroProps) {
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
    if (props.barbeiro) {
      getPhotoUser(props.barbeiro.id);
    }
  }, [props.barbeiro]);

  return (
    <div className={styles.card} onClick={props.onClick} key={props.barbeiro?.id}>
      <div className={styles.containerImg}>
        <img src={photo || props.barbeiro?.avatar_url || props.barbeiro?.picture} alt={props.barbeiro?.nome} />
      </div>
      <div className={styles.containerInfo}>
        <h2 className={styles.title}>{name || props.barbeiro?.nome}</h2>
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
