import { Button } from 'components/Button';

import styles from './Overlay.module.scss';

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function Overlay(props: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.containerOverlay}>
        {props.children}
        <h1>{props.title}</h1>
        <p>{props.description}</p>
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
