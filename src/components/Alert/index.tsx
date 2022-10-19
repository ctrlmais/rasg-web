import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import cx from 'classnames';
import { AlertProps } from 'types/ComponentsProps';

import styles from './Alert.module.scss';

export function Alert({
  onClick,
  title,
  success,
  error,
  warning,
  info,
  close,
}: AlertProps) {
  const [open, setOpen] = useState(true);
  return (
    <>
      {open && (
        <div
          className={cx(styles.alert, {
            [styles.success]: success,
            [styles.error]: error,
            [styles.warning]: warning,
            [styles.info]: info,
          })}
        >
          <strong
            style={{
              cursor: onClick ? 'pointer' : 'default',
            }}
            onClick={onClick}
          >
            {title}
          </strong>
          {close && (
            <button className={styles.close} onClick={() => setOpen(false)}>
              <IoMdClose size={20} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
