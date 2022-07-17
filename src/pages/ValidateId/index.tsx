import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Ring } from '@uiball/loaders';

import { Header } from 'components/Header';

import { useTheme } from 'contexts/Theme';
import { useToast } from 'contexts/Toast';

import { validateSchedule } from 'services/post/validateSchedule';

import styles from './Validate.module.scss';

export function ValidateId() {
  const { id } = useParams();
  const { theme } = useTheme();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);

  async function validarAgendamento() {
    setLoading(true);
    const { data, error } = await validateSchedule(true, id as string);

    if (error) {
      toast.error(error.message, { id: 'toast' });
      setLoading(false);
      return;
    }

    if (data) {
      toast.success('Validado com sucesso!', { id: 'toast' });
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id !== 'No result') {
      validarAgendamento();
    }
  }, []);

  return (
    <>
      <div className={styles.home} data-theme={theme}>
        <Header back />
        <div className={styles.container}>
          {loading && (
            <Ring speed={2} lineWeight={5} color="#ff9000" size={64} />
          )}
        </div>
      </div>
    </>
  );
}
