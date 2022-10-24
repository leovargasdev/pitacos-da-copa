import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import styles from './styles.module.scss'
import { AvatarMenu } from '../AvatarMenu'
import { Logo } from 'components/Logo'

export const Header = () => {
  const { status } = useSession()

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link href="/">
          <a className={styles.header__logo}>
            <Logo />
          </a>
        </Link>

        <nav>
          <ul className={styles.navigation}>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/ranking">
                <a>Ranking</a>
              </Link>
            </li>
            <li>
              <Link href="/meus-pitacos">
                <a>Meus pitacos</a>
              </Link>
            </li>
            <li>
              <Link href="/sobre">
                <a>Sobre</a>
              </Link>
            </li>
          </ul>
        </nav>

        {status === 'authenticated' ? (
          <AvatarMenu />
        ) : (
          <Link href="/login">
            <a className={styles.header__signIn.concat(' button')}>
              Acessar conta
            </a>
          </Link>
        )}
      </div>
    </header>
  )
}
