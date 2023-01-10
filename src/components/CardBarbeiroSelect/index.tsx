import { useEffect, useState } from 'react';

import { Skeleton } from '@mui/material';
import Avvvatars from 'avvvatars-react';
import { CardBarbeiroProps } from 'types/ComponentsProps';

import { useToast } from 'contexts/Toast';

import { getSearchPhotoByHashAWS, getSearchPhotoByIdAWS } from 'services/get';

import styles from './CardBarbeiroSelect.module.scss';

export function CardBarbeiroSelected({ barbeiro }: CardBarbeiroProps) {
  const { toast } = useToast();
  const [photoURI, setPhotoURI] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPhoto() {
      try {
        setLoading(true);
        const { data } = await getSearchPhotoByIdAWS(
          String(barbeiro?.cdUsuario),
        );

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

    getPhoto();
  }, []);

  return (
    <div key={barbeiro?.cdUsuario} className={styles.containerCard}>
      <div className={styles.spacing}>
        {loading ? (
          <>
            <Skeleton
              variant="circular"
              width={38}
              height={38}
              animation="wave"
            >
              <Avvvatars value={barbeiro?.nmUsuario || ''} size={38} />
            </Skeleton>
          </>
        ) : (
          <>
            {photoURI === '' ? (
              <Avvvatars value={barbeiro?.nmUsuario || ''} size={38} />
            ) : (
              <img
                src={photoURI}
                alt={barbeiro?.nmUsuario || ''}
                className={styles.img}
              />
            )}
          </>
        )}
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.textTitle}>{barbeiro?.nmUsuario}</h2>
      </div>
    </div>
  );
}
