import { isAndroid, isWindows, isMacOs, isIOS } from 'react-device-detect';
import { SiApple, SiGooglecalendar } from 'react-icons/si';

import { OverlayProps } from 'types/IComponents';

import { Button } from 'components/Button';

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
              <button
                className={styles.google}
                type="button"
                onClick={() => {
                  handleGoogleCalendar();
                }}
              >
                <SiGooglecalendar />
                Adicionar ao Google Calendar
              </button>
            )}
            {isIOS && (
              <button
                className={styles.apple}
                type="button"
                onClick={() => {
                  eventSaveCliente.download();
                }}
              >
                <SiApple />
                Adicionar ao Apple Calendar
              </button>
            )}

            {(isWindows || isMacOs) && (
              <>
                <button
                  className={styles.google}
                  type="button"
                  onClick={() => {
                    handleGoogleCalendar();
                  }}
                >
                  <SiGooglecalendar />
                  Adicionar ao Google Calendar
                </button>
                <button
                  className={styles.apple}
                  type="button"
                  onClick={() => {
                    eventSaveCliente.download();
                  }}
                >
                  <SiApple />
                  Adicionar ao Apple Calendar
                </button>
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
