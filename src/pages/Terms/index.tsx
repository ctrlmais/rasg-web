import { ButtonTopPage } from 'components/ButtonTop';
import { Header } from 'components/Header';

import { useTheme } from 'contexts/Theme';

import styles from './Terms.module.scss';
export function Terms() {
  const { theme } = useTheme();

  return (
    <div className={styles.home} data-theme={theme}>
      <Header logo path="/horarios" />

      <main className={styles.container}>
        <h1 className={styles.title}>
          TERMOS E CONDIÇÕES GERAIS DE USO DO SITE RASG
        </h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '1.75rem',
            lineHeight: '1.5rem',
          }}
        >
          <h3>
            <span>1. Termos</span>
          </h3>
          <p>
            <span>
              Ao acessar ao site <a href="https://app.rasg.com.br">RASG</a>,
              concorda em cumprir estes termos de serviço, todas as leis e
              regulamentos aplicáveis e concorda que é responsável pelo
              cumprimento de todas as leis locais aplicáveis. Se você não
              concordar com algum desses termos, está proibido de usar ou
              acessar este site. Os materiais contidos neste site são protegidos
              pelas leis de direitos autorais e marcas comerciais aplicáveis.
            </span>
          </p>
          <h3>
            <span>2. Uso de Licença</span>
          </h3>
          <p>
            <span>
              É concedida permissão para baixar temporariamente uma cópia dos
              materiais (informações ou software) no site RASG , apenas para
              visualização transitória pessoal e não comercial. Esta é a
              concessão de uma licença, não uma transferência de título e, sob
              esta licença, você não pode:&nbsp;
            </span>
          </p>
          <ol style={{ marginLeft: '2.5rem' }}>
            <li>
              <span>modificar ou copiar os materiais;&nbsp;</span>
            </li>
            <li>
              <span>
                usar os materiais para qualquer finalidade comercial ou para
                exibição pública (comercial ou não comercial);&nbsp;
              </span>
            </li>
            <li>
              <span>
                tentar descompilar ou fazer engenharia reversa de qualquer
                software contido no site RASG;&nbsp;
              </span>
            </li>
            <li>
              <span>
                remover quaisquer direitos autorais ou outras notações de
                propriedade dos materiais; ou&nbsp;
              </span>
            </li>
            <li>
              <span>
                transferir os materiais para outra pessoa ou 'espelhe' os
                materiais em qualquer outro servidor.
              </span>
            </li>
          </ol>
          <p>
            <span>
              Esta licença será automaticamente rescindida se você violar alguma
              dessas restrições e poderá ser rescindida por RASG a qualquer
              momento. Ao encerrar a visualização desses materiais ou após o
              término desta licença, você deve apagar todos os materiais
              baixados em sua posse, seja em formato eletrónico ou impresso.
            </span>
          </p>
          <h3>
            <span>3. Isenção de responsabilidade</span>
          </h3>
          <ol style={{ marginLeft: '2.5rem' }}>
            <li>
              <span>
                Os materiais no site da RASG são fornecidos 'como estão'. RASG
                não oferece garantias, expressas ou implícitas, e, por este
                meio, isenta e nega todas as outras garantias, incluindo, sem
                limitação, garantias implícitas ou condições de comercialização,
                adequação a um fim específico ou não violação de propriedade
                intelectual ou outra violação de direitos.
              </span>
            </li>
            <li>
              <span>
                Além disso, o RASG não garante ou faz qualquer representação
                relativa à precisão, aos resultados prováveis ou à
                confiabilidade do uso dos materiais em seu site ou de outra
                forma relacionado a esses materiais ou em sites vinculados a
                este site.
              </span>
            </li>
          </ol>
          <h3>
            <span>4. Limitações</span>
          </h3>
          <p>
            <span>
              Em nenhum caso o RASG ou seus fornecedores serão responsáveis por
              quaisquer danos (incluindo, sem limitação, danos por perda de
              dados ou lucro ou devido a interrupção dos negócios) decorrentes
              do uso ou da incapacidade de usar os materiais em RASG, mesmo que
              RASG ou um representante autorizado da RASG tenha sido notificado
              oralmente ou por escrito da possibilidade de tais danos. Como
              algumas jurisdições não permitem limitações em garantias
              implícitas, ou limitações de responsabilidade por danos
              conseqüentes ou incidentais, essas limitações podem não se aplicar
              a você.
            </span>
          </p>
          <h3>
            <span>5. Precisão dos materiais</span>
          </h3>
          <p>
            <span>
              Os materiais exibidos no site da RASG podem incluir erros
              técnicos, tipográficos ou fotográficos. RASG não garante que
              qualquer material em seu site seja preciso, completo ou atual.
              RASG pode fazer alterações nos materiais contidos em seu site a
              qualquer momento, sem aviso prévio. No entanto, RASG não se
              compromete a atualizar os materiais.
            </span>
          </p>
          <h3>
            <span>6. Links</span>
          </h3>
          <p>
            <span>
              O RASG não analisou todos os sites vinculados ao seu site e não é
              responsável pelo conteúdo de nenhum site vinculado. A inclusão de
              qualquer link não implica endosso por RASG do site. O uso de
              qualquer site vinculado é por conta e risco do usuário.
            </span>
          </p>

          <h3>
            <span>Modificações</span>
          </h3>
          <p>
            <span>
              O RASG pode revisar estes termos de serviço do site a qualquer
              momento, sem aviso prévio. Ao usar este site, você concorda em
              ficar vinculado à versão atual desses termos de serviço.
            </span>
          </p>
          <h3>
            <span>Lei aplicável</span>
          </h3>
          <p>
            <span>
              Estes termos e condições são regidos e interpretados de acordo com
              as leis do RASG e você se submete irrevogavelmente à jurisdição
              exclusiva dos tribunais naquele estado ou localidade.
            </span>
          </p>
        </div>
      </main>

      <ButtonTopPage />
    </div>
  );
}
