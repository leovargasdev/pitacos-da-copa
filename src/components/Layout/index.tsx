import { Header } from './Header'
import { IoHeartSharp } from 'react-icons/io5'

import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <div className={styles.layout}>
    {/* <span className={styles.alert}>
      <FaInfoCircle />
      Os jogos oficiais serão publicados no dia 13 de Novembro
    </span> */}

    <Header />

    <main className={styles.layout__main}>{children}</main>

    <footer className={styles.layout__footer}>
      <p>
        Idealizado por{' '}
        <a
          href="https://www.leonardovargas.dev"
          target="_blank"
          rel="noreferrer"
        >
          Leonardo Vargas
        </a>
        , feito com <IoHeartSharp size={12} />
      </p>
    </footer>
  </div>
)
