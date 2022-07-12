import Pagination from '@mui/material/Pagination';
import { Ring } from '@uiball/loaders';
import { ClienteMetadata } from 'types/IContext';

import { ButtonTopPage } from 'components/ButtonTop';
import { CardCliente } from 'components/CardCliente';
import { Header } from 'components/Header';

import { useTheme } from 'contexts/Theme';

import { useHistory } from 'hooks/useHistory';

import styles from './History.module.scss';

export function History() {
  const { theme } = useTheme();

  const {
    loading,
    agendamentos,
    agendamentosQtd,
    handleChangePage,
    currentPage,
  } = useHistory();

  return (
    <div className={styles.home} data-theme={theme}>
      <Header logo />
      <div className={styles.container}>
        <div className={styles.containerOcupacao}>Histórico</div>

        <ButtonTopPage />

        <div className={styles.containerList}>
          {loading ? (
            <Ring speed={2} lineWeight={5} color="#ff9000" size={64} />
          ) : (
            <>
              {agendamentos.length > 0 &&
                agendamentos.map((cliente: ClienteMetadata) => (
                  <>
                    <div className={styles.containerBarber} key={cliente.id}>
                      <CardCliente key={cliente.id} cliente={cliente} />
                    </div>
                  </>
                ))}
            </>
          )}
        </div>

        {agendamentosQtd && (
          <div className={styles.paginationContainer}>
            <Pagination
              count={Math.ceil(agendamentosQtd / 4)}
              variant="outlined"
              shape="rounded"
              page={currentPage}
              onChange={handleChangePage}
              className={styles.pagination}
            />
          </div>
        )}
      </div>
    </div>
  );
}
