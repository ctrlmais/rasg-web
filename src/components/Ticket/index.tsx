import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tilt from 'react-parallax-tilt';

import Avvvatars from 'avvvatars-react';
import { QRCodeSVG } from 'qrcode.react';
import { TicketProps } from 'types/IComponents';

import { useToast } from 'contexts/Toast';

import { usePhoto } from 'hooks/usePhoto';

import './Ticket.module.scss';

export function Ticket(props: TicketProps) {
  const { toast } = useToast();
  const { photo, name } = usePhoto(props.cliente?.client_id || '');

  const [copied, setCopied] = useState(false);

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
