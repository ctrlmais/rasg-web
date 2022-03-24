import { useEffect } from 'react';

import { useTheme } from 'contexts/Theme';
import { useToast } from 'contexts/Toast';

import styles from './Home.module.scss';

export function Homepage() {
  const { theme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    toast.success('Bem vindo ao template ialexanderbrito', { id: 'ik' });
  }, [toast]);

  return (
    <>
      <div className={styles.home} data-theme={theme}>
        <h1>
          ialexander<span>brito</span>
        </h1>
      </div>
    </>
  );
}
