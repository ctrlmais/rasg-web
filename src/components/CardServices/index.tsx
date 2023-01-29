import { BiTime } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';

import cx from 'classnames';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { useTheme } from 'contexts/Theme';

import { useServices } from 'hooks/useServices';

import styles from './CardServices.module.scss';

export function CardServices() {
  const { theme } = useTheme();
  const {
    formikServices,
    tiposServicos,
    servicoSelecionado,
    setServicoSelecionado,
    putServico,
    isServiceStoraged,
    deleteServico,
  } = useServices();

  return (
    <>
      <div className={styles.wrapper} data-theme={theme}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikServices.handleSubmit(e);
          }}
        >
          <div className={styles.container}>
            <div className={styles.containerInput}>
              <Input
                name="nmServico"
                placeholder="Nome do serviço"
                value={formikServices.values.nmServico}
                onChange={formikServices.handleChange}
                onBlur={formikServices.handleBlur}
                maxLength={100}
                icon={<FiEdit color="#666360" size={24} />}
              />
              <Input
                name="deServico"
                placeholder="Descrição do serviço"
                value={formikServices.values.deServico}
                onChange={formikServices.handleChange}
                onBlur={formikServices.handleBlur}
                maxLength={100}
                icon={<FiEdit color="#666360" size={24} />}
              />
              Tipo do serviço
              <div className={styles.tipoServicoContainer}>
                {tiposServicos.map((dia) => (
                  <div
                    className={cx(styles.tipoServico, {
                      [styles.tipoServicoSelected]:
                        servicoSelecionado?.cdTipoServico === dia.cdTipoServico,
                    })}
                    onClick={() => {
                      setServicoSelecionado(dia);
                    }}
                    key={dia.cdTipoServico}
                  >
                    {dia.deTipoServico}
                  </div>
                ))}
              </div>
              Duração do Serviço
              <Input
                name="tmServico"
                placeholder="Duração em minutos"
                value={formikServices.values.tmServico}
                onChange={formikServices.handleChange}
                onBlur={formikServices.handleBlur}
                maxLength={4}
                icon={<BiTime color="#666360" size={24} />}
              />
            </div>
            <Button
              type="submit"
              onClick={() => {
                isServiceStoraged
                  ? putServico()
                  : formikServices.handleSubmit();
              }}
            >
              {isServiceStoraged ? 'Atualizar' : 'Adicionar'}
            </Button>

            {isServiceStoraged && (
              <Button
                type="button"
                style={{
                  marginTop: '1rem',
                  background: '#c53030',
                }}
                onClick={() => {
                  deleteServico();
                }}
              >
                Excluir
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
