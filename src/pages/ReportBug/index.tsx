import { FiCheck, FiMessageSquare } from 'react-icons/fi';

import { useForm } from '@formspree/react';

import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Input } from 'components/Input';
import { Overlay } from 'components/Overlay';

import { useTheme } from 'contexts/Theme';

import { useReport } from 'hooks/useReport';

import styles from './ReportBug.module.scss';

export function ReportBug() {
  const { theme } = useTheme();
  const { formikReportBug } = useReport();
  const [state, handleSubmit] = useForm(
    process.env.REACT_APP_FORMSPREE_API as string,
  );

  if (state.succeeded) {
    return (
      <div className={styles.home} data-theme={theme}>
        <Overlay
          title="Obrigado!"
          description="Seu relatório foi enviado com sucesso!"
        >
          <FiCheck color="#04D361" size={62} />
        </Overlay>
      </div>
    );
  }

  return (
    <div className={styles.home} data-theme={theme}>
      <Header logo path="/bug" />
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Enviar bug</h2>

          <div className={styles.bugContainer}>
            <label className={styles.label}>Qual página você viu o bug?</label>
            <Input
              type="text"
              placeholder="Qual página você viu o bug?"
              icon={<FiMessageSquare color="#666360" size={24} />}
              {...formikReportBug.getFieldProps('page')}
            />

            <label className={styles.label}>O que aconteceu?</label>
            <textarea
              className={styles.area}
              rows={10}
              placeholder="O que aconteceu?"
              {...formikReportBug.getFieldProps('message')}
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button type="submit">Enviar relatório</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
