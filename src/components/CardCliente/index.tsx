import { useEffect, useState } from 'react';
import { BsClock, BsScissors } from 'react-icons/bs';

import Avvvatars from 'avvvatars-react';
import { CardClienteProps } from 'types/IComponents';

import { getPhoto } from 'services/get/photo';

import styles from './CardCliente.module.scss';

export function CardCliente(props: CardClienteProps) {
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
    if (props.cliente) {
      getPhotoUser(props.cliente.client_id);
    }
  }, [props.cliente]);

  return (
    <div className={styles.card} onClick={props.onClick} key={props.cliente?.client_id}>
      <div className={styles.alert}>
        <br />
      </div>
      <div className={styles.containerImg}>
        {photo === '' ? (
          <Avvvatars value={props.cliente?.client_name || ''} size={50} />
        ) : (
          <img
            src={photo || props.cliente?.client_avatar || props.cliente?.client_picture}
            alt={props.cliente?.client_name}
          />
        )}
      </div>
      <div className={styles.containerInfo}>
        <h2 className={styles.title}>{name || props.cliente?.client_name}</h2>
        <strong className={styles.info}>
          <BsClock color="#FF9000" size={16} style={{ marginRight: '8px' }} />
          {props.cliente?.hour} |{' '}
          <BsScissors color="#FF9000" size={16} style={{ marginLeft: '6px', marginRight: '3px' }} />
          {props.cliente?.barber_name}
        </strong>
      </div>
    </div>
  );
}
