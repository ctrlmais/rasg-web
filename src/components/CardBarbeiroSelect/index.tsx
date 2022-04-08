import { useEffect, useState } from 'react';

import { CardBarbeiroProps } from 'types/IComponents';

import { getPhoto } from 'services/get/photo';

import styles from './CardBarbeiroSelect.module.scss';

export function CardBarbeiroSelected(props: CardBarbeiroProps) {
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
    if (!data[0].j) return;
    if (!data[0].j[0]) return;

    setPhoto(data[0].j[0].src);
    setName(data[0].j[0].name);
  }

  useEffect(() => {
    if (props.barbeiro) {
      getPhotoUser(props.barbeiro.id);
    }
  }, [props.barbeiro]);

  return (
    <div key={props.barbeiro?.id} className={styles.containerCard}>
      <div className={styles.spacing}>
        <img
          src={photo || props.barbeiro?.avatar_url || props.barbeiro?.picture}
          alt={props.barbeiro?.nome}
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.textTitle}>{name || props.barbeiro?.nome}</h2>
      </div>
    </div>
  );
}
