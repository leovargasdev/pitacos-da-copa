import { Header } from './Header'

import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <div className={styles.layout}>
    <Header />

    <main className={styles.layout__main}>{children}</main>
  </div>
)
