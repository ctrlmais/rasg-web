import { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner';

import { useToast } from 'contexts/Toast';

export function ReaderQrCode() {
  const { toast } = useToast();
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  const isDesktop = width > 768;

  function openLink(url: string) {
    window.open(url);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => {
          toast.success(
            'Permissão de câmera concedida! A câmera está pronta para uso.',
            {
              id: 'toast',
            },
          );
        })
        .catch(() => {
          toast.error(
            'Permissão de câmera negada! É necessário permitir o acesso à câmera para utilizar o leitor de QR Code.',
            { id: 'toast' },
          );
        });
    }
  }, []);

  return (
    <QrReader
      delay={300}
      onScan={(data: any) => {
        if (data) {
          openLink(data.text);
        }
      }}
      constraints={
        isDesktop
          ? undefined
          : {
              video: {
                facingMode: { exact: `environment` },
              },
            }
      }
      style={{ width: '95%' }}
    />
  );
}
