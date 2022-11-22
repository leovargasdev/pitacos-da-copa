import { NextPage } from 'next'
import { IoInformationCircleOutline } from 'react-icons/io5'

import { SEO } from 'components/SEO'
import styles from './styles.module.scss'

const AboutPage: NextPage = () => (
  <>
    <SEO tabName="Sobre" title="Mais detalhes sobre o pitaco da copa" />

    <h1 className={styles.title}>
      <IoInformationCircleOutline /> Sobre o projeto
    </h1>

    <div className={styles.content}>
      <div>
        <p>
          O pitacos da copa 2022 é projeto open source e totalmente gratuito.
          Para fazer pitacos você precisa fazer login social na nossa
          plataforma, temos suporte com contas do <strong>Google</strong> e do{' '}
          <strong>Facebook</strong>.
        </p>
        <p>
          Todo participante por padrão participará do{' '}
          <strong>ranking geral</strong>, mas se você tiver interesse de criar
          um ranking com o seu grupo de amigos ou de trabalho, é possível fazer
          isso! Basta acessar o seu perfil e cadastrar o grupo na sua conta.
        </p>
      </div>

      <div>
        <h2>Como funciona o sistema de pontuação</h2>
        <p>
          Ao realizar um pitaco, será gerado uma pontuação após o termino da
          partida. Cada pitaco terá <strong>13 pontos</strong> como pontuação
          máxima, veja as regras da pontuação:
        </p>

        <ul>
          <li>+3 pontos por acertar o time vencedor.</li>
          <li>+5 pontos por acertar o placar do time A.</li>
          <li>+5 pontos por acertar o placar do time B.</li>
        </ul>

        <p>Cenários de exemplo:</p>
        <span>GERAR IMAGENS DE EXEMPLO</span>
      </div>

      <div>
        <h2>Conheça mais sobre a nossa comunidade</h2>
        <p>
          <a
            href="https://discord.com/invite/JPS2bY6GVy"
            target="_blank"
            rel="noreferrer"
          >
            Clique aqui
          </a>{' '}
          para entrar na nossa comunidade do discord.
        </p>
      </div>
    </div>
  </>
)

export default AboutPage
