import { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';

import Avvvatars from 'avvvatars-react';
import { QRCodeSVG } from 'qrcode.react';
import { ClienteMetadata } from 'types/IContext';

import { getPhoto } from 'services/get/photo';

import './styles.scss';

interface Props {
  cliente?: ClienteMetadata | undefined;
}

export function Ticket(props: Props) {
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

  function get8caracters(str: string) {
    return str?.substring(0, 8).toUpperCase();
  }

  return (
    <>
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.1}
        glareColor="#ffffff"
        glarePosition="all"
        tiltAxis={'y'}
        glareBorderRadius="30px"
        perspective={2000}
      >
        <div className="ticket-wrapper">
          <div className="ticket">
            <div className="ticket-profile">
              <div className="ticket-profile-top">
                {photo === '' ? (
                  <div className="ticket-profile-top-image">
                    <Avvvatars value={props.cliente?.client_name || ''} size={82} />
                  </div>
                ) : (
                  <img
                    src={photo || props.cliente?.client_picture || props.cliente?.client_avatar}
                    alt={name}
                    className="ticket-profile-top-image"
                  />
                )}
                <div className="ticket-profile-top-text">
                  <div className="ticket-profile-top-text-name">{props.cliente?.client_name}</div>
                  <div className="ticket-profile-top-text-profile">
                    <a href="https://github.com/eddyw" target="_blank" rel="noreferrer">
                      {props.cliente?.client_id}
                    </a>
                  </div>
                </div>
              </div>
              <div className="ticket-descrption">
                <div className="text-description-container">
                  <div className="qr-code">
                    <QRCodeSVG
                      value={`/valida/${props.cliente?.id}`}
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
              <div className="ticket-number">№ {get8caracters(props.cliente?.id || '')}</div>
            </div>
          </div>
        </div>
      </Tilt>
    </>
  );
}
