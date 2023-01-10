import { Dialog, Skeleton } from '@mui/material';

import { Alert } from 'components/Alert';
import { Button } from 'components/Button';
import { CardServices } from 'components/CardServices';
import { DropzoneServices } from 'components/DropzoneServices';
import { Header } from 'components/Header';
import { ModalTitle } from 'components/ModalTitle';

import { formatHours } from 'utils/formatHours';

import { useTheme } from 'contexts/Theme';

import { useServices } from 'hooks/useServices';

import styles from './Services.module.scss';

export function Services() {
  const { theme } = useTheme();

  const {
    modalIsOpen,
    setIsOpen,
    closeModal,
    servicos,
    savePhotoServices,
    loading,
    putPhotoServices,
  } = useServices();

  return (
    <div className={styles.home} data-theme={theme}>
      <Header logo path="/services" />

      <div className={styles.container}>
        <h2 className={styles.title}>Adicione seus serviços</h2>

        <div className={styles.containerAlert}>
          <Alert
            title="Atualmente só é permito adicionar 3 serviços ao seu perfil."
            warning
          />
        </div>
        <div className={styles.form}>
          {servicos?.map((servico, index) => (
            <div key={servico?.cdServico} className={styles.card}>
              <div>
                {loading ? (
                  <Skeleton
                    variant="rounded"
                    width={148}
                    height={90}
                    animation="wave"
                  />
                ) : (
                  <DropzoneServices
                    onFileUploaded={(file) => {
                      putPhotoServices(
                        String(savePhotoServices[index]?.cdFotoServico),
                        file,
                        String(servico?.cdServico),
                      );
                    }}
                    image={savePhotoServices[index]?.photo}
                  />
                )}
              </div>
              <div
                className={styles.cardContainer}
                onClick={() => {
                  localStorage.setItem(
                    '@rasg:service',
                    JSON.stringify(servico),
                  );
                  setIsOpen(true);
                }}
              >
                <div className={styles.containerNome}>
                  <h3>Nome:{' '}</h3>
                  <h3>{servico?.nmServico}</h3>
                </div>
                <div className={styles.containerDescricao}>
                  <h3>Descrição:{' '}</h3>
                  <h3>{servico?.deServico}</h3>
                </div>
                <div className={styles.containerDuracao}>
                  <h3>Duração:{' '}</h3>
                  <h3>{formatHours(servico?.tmServico)}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={styles.containerButton}
          style={{ justifyContent: 'center' }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            type="button"
            disabled={servicos?.length === 3}
          >
            Adicionar um serviço
          </Button>
        </div>
      </div>

      <Dialog
        onClose={closeModal}
        aria-labelledby="customized-dialog-title"
        open={modalIsOpen}
        maxWidth="xs"
        fullWidth
      >
        <ModalTitle onClose={closeModal} />
        <CardServices />
      </Dialog>
    </div>
  );
}
