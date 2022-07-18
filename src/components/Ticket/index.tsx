import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tilt from 'react-parallax-tilt';

import Avvvatars from 'avvvatars-react';
import { QRCodeSVG } from 'qrcode.react';
import { ClienteMetadata } from 'types/IContext';

import { useToast } from 'contexts/Toast';

import { getPhoto } from 'services/get/photo';

import './styles.scss';

interface Props {
  cliente?: ClienteMetadata | undefined;
}

export function Ticket(props: Props) {
  const { toast } = useToast();
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  async function getPhotoUser(id: string) {
    const { data, error, status } = await getPhoto(id);

    if (error) {
      switch (status) {
        default:
          return;
      }
    }

    if (!data) return;
    if (!data[0].j) return;
    if (!data[0].j[0]) return;

    setPhoto(data[0].j[0].src);
    setName(data[0].j[0].name);
  }

  useEffect(() => {
    if (props.cliente) {
      getPhotoUser(props.cliente.client_id);
    }
  }, [props.cliente]);

  function get8caracters(str: string) {
    return str?.substring(0, 8).toUpperCase();
  }

  useEffect(() => {
    if (copied) {
      toast.success('Código de agendamento copiado!', { id: 'toast' });
      setCopied(false);
    }
  }, [copied]);

  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareColor="#ffffff"
      glarePosition="all"
      tiltAxis={'y'}
      glareBorderRadius="30px"
      perspective={2000}
    >
      <CopyToClipboard
        text={props.cliente?.id || ''}
        onCopy={() => setCopied(!copied)}
      >
        <div className="ticket-wrapper">
          <div className="ticket">
            <div className="ticket-profile">
              <div className="ticket-profile-top">
                {photo === '' &&
                (props.cliente?.client_avatar === null ||
                  props.cliente?.client_avatar === undefined) ? (
                  <div className="ticket-profile-top-image">
                    <Avvvatars
                      value={props.cliente?.client_name || ''}
                      size={82}
                    />
                  </div>
                ) : (
                  <img
                    src={
                      photo ||
                      props.cliente?.client_picture ||
                      props.cliente?.client_avatar
                    }
                    alt={name}
                    className="ticket-profile-top-image"
                  />
                )}
                <div className="ticket-profile-top-text">
                  <div className="ticket-profile-top-text-name">
                    {props.cliente?.client_name}
                  </div>
                  <div className="ticket-profile-top-text-profile">
                    <a target="_blank" rel="noreferrer">
                      {props.cliente?.id}
                    </a>
                  </div>
                </div>
              </div>
              <div className="ticket-descrption">
                <div className="text-description-container">
                  <div className="qr-code">
                    <QRCodeSVG
                      value={`${process.env.REACT_APP_URL}/validate/${props.cliente?.id}`}
                      size={100}
                      bgColor={'#ffffff'}
                      fgColor={'#000000'}
                      level={'Q'}
                      includeMargin={false}
                    />
                  </div>
                  <div>
                    Data e Hora
                    <br />
                    {props.cliente?.br_date}
                  </div>
                  <div>
                    Barbeiro
                    <br />
                    {props.cliente?.barber_name}
                  </div>
                </div>
              </div>
            </div>
            <div className="ticket-number-wrapper">
              <div className="ticket-number">
                № {get8caracters(props.cliente?.id || '')}
              </div>
            </div>
          </div>
        </div>
      </CopyToClipboard>
    </Tilt>
  );
}
