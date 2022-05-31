import Modal from 'react-modal';

import { Barbeiro } from 'pages/Barbeiro';
import { Cliente } from 'pages/Cliente';
import { ReportBug } from 'pages/ReportBug';

import { ButtonTopPage } from 'components/ButtonTop';
import { FloatingButton } from 'components/FloatingButton';
import { Header } from 'components/Header';
import { VerificacaoOcupacao } from 'components/Verificacao';

import { useTheme } from 'contexts/Theme';
import { useUser } from 'contexts/User';

import { useReport } from 'hooks/useReport';

import { css } from 'styles/calendar.styles';

import styles from './Home.module.scss';

export function Home() {
  const { theme } = useTheme();
  const { verificaLoginGoogleEOcupacao, verificaOcupacao } = useUser();
  const { openModal, closeModal, customStyles, modalIsOpen } = useReport();

  return (
    <div className={styles.home} data-theme={theme}>
      <style>{css}</style>
      <FloatingButton onClick={openModal} />
      <ButtonTopPage />
      <Header logo />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ReportBug />
      </Modal>

      <div className={styles.container}>
        {verificaLoginGoogleEOcupacao() && <VerificacaoOcupacao />}
        {verificaOcupacao('cliente') && <Cliente />}
        {verificaOcupacao('barbeiro') && <Barbeiro />}
      </div>
    </div>
  );
}
