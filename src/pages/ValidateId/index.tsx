import { BsCheck } from 'react-icons/bs';

import { Ring } from '@uiball/loaders';

import { Header } from 'components/Header';

import { useTheme } from 'contexts/Theme';

import { useValidate } from 'hooks/useValidate';

import styles from './Validate.module.scss';

export function ValidateId() {
  const { theme } = useTheme();

  const { loading } = useValidate();

  return (
    <>
      <div className={styles.home} data-theme={theme}>
        <Header logo path="/validate" />
        <div className={styles.container}>
          {loading ? (
            <Ring speed={2} lineWeight={5} color="#ff9000" size={64} />
          ) : (
            <>
              <BsCheck size={64} color="#ff9000" />
              <h2>Horário validado com sucesso!</h2>
            </>
          )}
        </div>
      </div>
    </>
  );
}
