import Link from 'next/link'
import Image from 'next/image'

import { Ranking } from 'types'
import styles from './styles.module.scss'

interface ListRankingProps {
  ranking: Ranking[]
}

export const ListRanking = ({ ranking }: ListRankingProps) => (
  <ul className={styles.ranking}>
    {ranking.map((item, index) => (
      <li key={item._id}>
        <div className={styles.position}>
          <span>{index + 1}º</span>
          <div className={styles.user__image}>
            <Image
              src={item.user.image}
              layout="fill"
              objectFit="cover"
              alt={`Imagem de perfil do usuário ${item.user.name}`}
            />
          </div>
          <Link href={`/usuario/${item._id}/pitacos`}>
            <a>
              <strong>{item.user.name}</strong>
            </a>
          </Link>
        </div>

        <Link href={`/usuario/${item._id}/pitacos`}>
          <a>
            <p className={styles.points}>
              <b>{item.points}</b>
              <small>pontos</small>
            </p>
          </a>
        </Link>
      </li>
    ))}
  </ul>
)
