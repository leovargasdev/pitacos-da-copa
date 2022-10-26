import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

import styles from './styles.module.scss'
import { AvatarMenu } from '../AvatarMenu'
import { Logo } from 'components/Logo'
import { useRouter } from 'next/router'

export const Header = () => {
  const router = useRouter()
  const { status } = useSession()
  const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false)

  useEffect(() => {
    setOpenMenuMobile(false)
  }, [router.asPath])

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link href="/">
          <a className={styles.header__logo}>
            <Logo />
          </a>
        </Link>

        <nav className={openMenuMobile ? styles.active : ''}>
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
              <Link href="/ranking">
                <a>Times</a>
              </Link>
            </li>
            <li>
              <Link href="/sobre">
                <a>Como jogar</a>
              </Link>
            </li>
            <li className={styles.mobile}>
              <Link href="/sobre">
                <a>Meus palpites</a>
              </Link>
            </li>
          </ul>

          {status === 'authenticated' ? (
            <button
              type="button"
              onClick={() => signOut()}
              className={styles.nav__button}
            >
              Encerrar sessão
            </button>
          ) : (
            <Link href="/login">
              <a className={styles.nav__button}>Acessar conta</a>
            </Link>
          )}
        </nav>

        <div className={styles.avatarAndLogin}>
          {status === 'authenticated' ? (
            <AvatarMenu />
          ) : (
            <Link href="/login">
              <a className={styles.header__signIn}>Acessar conta</a>
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-expanded={openMenuMobile}
          className={styles.button__toggle}
          onClick={() => setOpenMenuMobile(state => !state)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
