import { useEffect, useState } from 'react';
import { BsCalendarDate, BsClock, BsScissors } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';

import { Skeleton } from '@mui/material';
import Avvvatars from 'avvvatars-react';
import { format } from 'date-fns';
import { CardClienteProps } from 'types/ComponentsProps';

import { useToast } from 'contexts/Toast';

import { getSearchPhotoByHashAWS, getSearchPhotoByIdAWS } from 'services/get';

import styles from './CardCliente.module.scss';

export function CardCliente({
  cliente,
  data,
  first,
  onClick,
  isVerified,
  ...props
}: CardClienteProps) {
  const { toast } = useToast();

  const [dateFormatted, setDateFormatted] = useState('');
  const [hoursFormatted, setHoursFormatted] = useState('');
  const [photoURI, setPhotoURI] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDate() {
      if (!cliente) return;

      setDateFormatted(format(new Date(cliente?.dtInicio), 'dd/MM/yyyy'));
      setHoursFormatted(format(new Date(cliente?.dtInicio), 'HH:mm'));
    }

    loadDate();
  }, [cliente]);

  async function getPhotoUser(id: string) {
    if (!id) return;

    setLoading(true);
    try {
      const { data } = await getSearchPhotoByIdAWS(id);

      if (!data.length) return;

      const { nmHash, nmMime } = data[0];

      const { data: photo } = await getSearchPhotoByHashAWS(nmHash);

      const photoURI = `data:${nmMime};base64,${photo}`;

      setPhotoURI(photoURI);
    } catch (error) {
      toast.error('Não foi possível carregar foto', { id: 'toast' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPhotoUser(String(cliente?.cliente?.cdUsuario));
  }, [cliente]);

  return (
    <div
      className={first ? styles.cardFirst : styles.card}
      onClick={onClick}
      key={cliente?.cdAgendamento}
      {...props}
    >
      <div className={styles.alert}>
        <br />
      </div>
      <div className={styles.containerImg}>
        {loading ? (
          <Skeleton variant="circular" width={50} height={50} />
        ) : (
          <>
            {photoURI ? (
              <img src={photoURI} alt={cliente?.cliente?.nmUsuario} />
            ) : (
              <Avvvatars value={cliente?.cliente?.nmUsuario || ''} size={50} />
            )}
          </>
        )}
      </div>
      <div className={styles.containerInfo}>
        <h2 className={styles.title}>
          {cliente?.cliente?.nmUsuario}
          {isVerified && (
            <>
              <MdVerified
                color="#FF9000"
                size={16}
                style={{ marginLeft: '6px', marginRight: '3px' }}
              />
            </>
          )}
        </h2>
        <strong className={styles.info}>
          <BsClock color="#FF9000" size={16} style={{ marginRight: '8px' }} />
          {hoursFormatted} | {''}
          {data ? (
            <>
              <BsCalendarDate
                color="#FF9000"
                size={16}
                style={{ marginLeft: '6px', marginRight: '3px' }}
              />
              {dateFormatted}
            </>
          ) : (
            <>
              <BsScissors
                color="#FF9000"
                size={16}
                style={{ marginLeft: '6px', marginRight: '3px' }}
              />
              {cliente?.gerenciador?.nmUsuario}
            </>
          )}
        </strong>
      </div>
    </div>
  );
}
