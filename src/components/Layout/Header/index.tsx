import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

export const Header = () => {
  const { data } = useSession()

  const user = data?.user

  return (
    <header className={styles.layout__header}>
      <div className={styles.layout__headerContent}>
        <span>Logo</span>

        <nav>
          <ul>
            <li className={styles.active}>Home</li>
            <li>Grupos</li>
            <li>Ranking</li>
            <li>Perfil</li>
          </ul>
        </nav>

        {/* {user ? (
          <button
            type="button"
            className={styles.signIn}
            onClick={() => signOut()}
          >
            Sair
          </button>
        ) : (
          <Link href="/login">
            <a className={styles.signIn}>Acessar conta</a>
          </Link>
        )} */}
      </div>
    </header>
  )
}
