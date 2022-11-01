import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FaSignOutAlt, FaUser, FaUserAstronaut } from 'react-icons/fa'

import { User } from 'types'
import styles from './styles.module.scss'

export const AvatarMenu = () => {
  const { data } = useSession()

  if (!data?.user) {
    return <></>
  }

  const user = data.user as User

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={styles.user__avatar}>
        {user.image ? (
          <Image
            src={user.image}
            layout="fill"
            objectFit="cover"
            alt={`Imagem de avatar do usuário ${user.name}`}
          />
        ) : (
          <span>
            <FaUserAstronaut />
          </span>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={12}
          className={styles.content}
        >
          <DropdownMenu.Group className={styles.user}>
            <DropdownMenu.Label>
              <strong>{user.name}</strong>
            </DropdownMenu.Label>
            <DropdownMenu.Label>
              <strong>{user.email}</strong>
            </DropdownMenu.Label>
          </DropdownMenu.Group>

          <DropdownMenu.Item>
            <Link href="/usuario/perfil">
              <a className={styles.item}>
                <span>
                  <FaUser />
                </span>
                Perfil
              </a>
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item className={styles.item} onClick={() => signOut()}>
            <span>
              <FaSignOutAlt />
            </span>
            Sair
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
