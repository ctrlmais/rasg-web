import { useEffect, useState } from 'react';
import { BsClock, BsScissors } from 'react-icons/bs';

import Avvvatars from 'avvvatars-react';
import { ClienteMetadata } from 'types/IContext';

import { getPhoto } from 'services/get/photo';

import styles from './CardCliente.module.scss';

type Props = {
  cliente: ClienteMetadata | undefined;
  onClick?: () => void;
};

export function CardCliente({ cliente, onClick }: Props) {
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
    if (cliente) {
      getPhotoUser(cliente.client_id);
    }
  }, [cliente]);

  return (
    <div className={styles.card} onClick={onClick} key={cliente?.client_id}>
      <div className={styles.alert}>
        <br />
      </div>
      <div className={styles.containerImg}>
        {photo === '' ? (
          <Avvvatars value={cliente?.client_name || ''} size={50} />
        ) : (
          <img src={photo || cliente?.client_avatar || cliente?.client_picture} alt={cliente?.client_name} />
        )}
      </div>
      <div className={styles.containerInfo}>
        <h2 className={styles.title}>{name || cliente?.client_name}</h2>
        <strong className={styles.info}>
          <BsClock color="#FF9000" size={16} style={{ marginRight: '8px' }} />
          {cliente?.hour} | <BsScissors color="#FF9000" size={16} style={{ marginLeft: '6px', marginRight: '3px' }} />
          {cliente?.barber_name}
        </strong>
      </div>
    </div>
  );
}
