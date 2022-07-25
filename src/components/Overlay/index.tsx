import { isAndroid, isWindows, isMacOs, isIOS } from 'react-device-detect';
import { SiApple, SiGooglecalendar } from 'react-icons/si';

import { OverlayProps } from 'types/IComponents';

import { Button } from 'components/Button';
import { SocialButton } from 'components/SocialButton';

import { useOverlay } from 'hooks/useOverlay';

import styles from './Overlay.module.scss';

export function Overlay(props: OverlayProps) {
  const { handleGoogleCalendar, eventSaveCliente } = useOverlay();

  return (
    <div className={styles.overlay}>
      <div className={styles.containerOverlay}>
        {props.children}
        <h1>{props.title}</h1>
        <p>{props.description}</p>

        {props.calendar && (
          <>
            {isAndroid && (
              <SocialButton
                icon={<SiGooglecalendar />}
                text=" Adicionar ao Google Calendar"
                onClick={() => {
                  handleGoogleCalendar();
                }}
                google
              />
            )}
            {isIOS && (
              <SocialButton
                onClick={() => {
                  eventSaveCliente.download();
                }}
                icon={<SiApple />}
                text="Adicionar ao Apple Calendar"
                apple
              />
            )}

            {(isWindows || isMacOs) && (
              <>
                <SocialButton
                  onClick={() => {
                    handleGoogleCalendar();
                  }}
                  icon={<SiGooglecalendar />}
                  text="Adicionar ao Google Calendar"
                  google
                />
                <SocialButton
                  onClick={() => {
                    eventSaveCliente.download();
                  }}
                  icon={<SiApple />}
                  text="Adicionar ao Apple Calendar"
                  apple
                />
              </>
            )}
          </>
        )}

        <Button
          type="button"
          onClick={() => {
            window.location.replace('/');
          }}
        >
          Ok
        </Button>
      </div>
    </div>
  );
}
