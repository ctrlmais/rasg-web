import { isAndroid, isWindows, isIOS, isMacOs } from 'react-device-detect';
import ICalendarLink from 'react-icalendar-link';
import { SiGooglecalendar, SiApple } from 'react-icons/si';

import { OverlayProps } from 'types/IComponents';

import { Button } from 'components/Button';

import { useOverlay } from 'hooks/useOverlay';

import styles from './Overlay.module.scss';

export function Overlay(props: OverlayProps) {
  const { handleGoogleCalendar, event } = useOverlay();

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.containerOverlay}>
          {props.children}
          <h1>{props.title}</h1>
          <p>{props.description}</p>

          {props.calendar && (
            <>
              {(isAndroid || isWindows) && (
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
                </>
              )}
              {(isIOS || isMacOs) && (
                <button className={styles.apple} type="button">
                  <SiApple />
                  <ICalendarLink event={event}>Adicionar ao Apple Calendar</ICalendarLink>
                </button>
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
    </>
  );
}
