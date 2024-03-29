import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tilt from 'react-parallax-tilt';

import Avvvatars from 'avvvatars-react';
import { format } from 'date-fns';
import { QRCodeSVG } from 'qrcode.react';
import { TicketProps } from 'types/ComponentsProps';

import { get8caracters } from 'utils/get8caracters';

import { useToast } from 'contexts/Toast';

import './Ticket.scss';
import { useAuth } from 'hooks/useAuth';

export function Ticket({ cliente, enable, execute }: TicketProps) {
  const { toast } = useToast();
  const { profileAvatar } = useAuth();

  const [copied, setCopied] = useState(false);

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
      glareBorderRadius="30px"
      perspective={2000}
      tiltEnable={!enable}
    >
      <CopyToClipboard
        text={String(cliente?.cdAgendamento) || ''}
        onCopy={() => {
          !enable && setCopied(!copied);
        }}
      >
        <div className="ticket-wrapper">
          <div className="ticket">
            <div className="ticket-profile">
              <div className="ticket-profile-top">
                {profileAvatar ? (
                  <img
                    src={profileAvatar}
                    alt="profile"
                    className="ticket-profile-top-image"
                  />
                ) : (
                  <div className="ticket-profile-top-image">
                    <Avvvatars
                      value={cliente?.cliente.nmUsuario || ''}
                      size={82}
                    />
                  </div>
                )}

                <div className="ticket-profile-top-text">
                  <div className="ticket-profile-top-text-name">
                    {cliente?.cliente.nmUsuario}
                  </div>
                  <div className="ticket-profile-top-text-profile">
                    <a target="_blank" rel="noreferrer">
                      #{get8caracters(String(cliente?.cliente.cdUsuario))}
                    </a>
                  </div>
                </div>
              </div>
              <div className="ticket-descrption">
                <div className="text-description-container">
                  <div className="qr-code">
                    <QRCodeSVG
                      value={`${process.env.REACT_APP_URL}/validate/${cliente?.cdAgendamento}`}
                      size={100}
                      bgColor={'#ffffff'}
                      fgColor={'#000000'}
                      level={'Q'}
                      includeMargin={false}
                      imageSettings={{
                        src: `${process.env.REACT_APP_URL}/favicon.png`,
                        x: undefined,
                        y: undefined,
                        height: 24,
                        width: 24,
                        excavate: true,
                      }}
                    />
                  </div>
                  <div>
                    Data e Hora
                    <br />
                    {format(
                      new Date(cliente?.dtInicio || new Date()),
                      'dd/MM/yyyy HH:mm',
                    )}
                  </div>
                  <div>
                    Barbeiro
                    <br />
                    {cliente?.gerenciador.nmUsuario}
                  </div>
                </div>
              </div>
            </div>
            {execute ? (
              <div className="ticket-aviso">Ticket já utilizado</div>
            ) : null}

            <div className="ticket-number-wrapper">
              <div className="ticket-number">
                № {get8caracters(String(cliente?.cdAgendamento))}
              </div>
            </div>
          </div>
        </div>
      </CopyToClipboard>
    </Tilt>
  );
}
