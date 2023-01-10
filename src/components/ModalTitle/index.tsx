import { IoClose } from 'react-icons/io5';

import { DialogTitle, IconButton } from '@mui/material';
import cx from 'classnames';
import { DialogTitleProps } from 'types/ComponentsProps';

import { useTheme } from 'contexts/Theme';

import styles from './ModalTitle.module.scss';

export function ModalTitle({ children, onClose, ...props }: DialogTitleProps) {
  const { theme } = useTheme();

  return (
    <div data-theme={theme}>
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        {...props}
        className={cx(
          styles.title,
          theme === 'dark' ? styles.dark : styles.light,
        )}
      >
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <IoClose
              color={theme === 'dark' ? '#f4ede8' : '#312e38'}
              size={24}
            />
          </IconButton>
        ) : null}
      </DialogTitle>
    </div>
  );
}
