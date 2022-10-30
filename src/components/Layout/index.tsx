import { Header } from './Header'
import { IoHeartSharp } from 'react-icons/io5'

import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <div className={styles.layout}>
    <Header />

    <main className={styles.layout__main}>{children}</main>

    <footer className={styles.layout__footer}>
      <div>
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

        <p>
          Gostou do projeto? <a href="/">Ajude na nossa vakinha</a>.
        </p>
      </div>
    </footer>
  </div>
)
