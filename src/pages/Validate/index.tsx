import { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

import { Header } from 'components/Header';

import { useTheme } from 'contexts/Theme';

import styles from './Validate.module.scss';

export function Validate() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [link, setLink] = useState('No result');

  useEffect(() => {
    if (link === 'No result') {
      navigate(link);
    }
  }, [link]);

  return (
    <>
      <div className={styles.home} data-theme={theme}>
        <Header back />

        <div className={styles.container}>
          <h2>Validar horário</h2>
        </div>

        <QrReader
          onResult={(result: any) => {
            if (result) {
              setLink(result?.text);
            }
          }}
          containerStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          videoContainerStyle={{
            paddingTop: '22rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          videoStyle={{
            display: 'flex',
            border: '8px dashed #ff9000',
            width: '29rem',
            left: 'none',
          }}
          constraints={{
            facingMode: 'user',
          }}
        />
      </div>
    </>
  );
}
