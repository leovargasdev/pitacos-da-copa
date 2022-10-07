import Image from 'next/image'
import { NextPage } from 'next'
import { HiOutlineClock, HiCalendar } from 'react-icons/hi'

import { ListTeams } from 'components/ListTeams'

import styles from 'styles/home.module.scss'

const HomePage: NextPage = () => (
  <div className={styles.container}>
    <ListTeams />

    <div className={styles.games}>
      <h1>Lista dos jogos</h1>

      <ul>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(game => (
          <li key={game} className={styles.game}>
            <time>
              <span>
                <HiCalendar /> 02/12
              </span>
              <span>
                <HiOutlineClock /> 14h30min
              </span>
            </time>

            <div>
              <div className={styles.team}>
                <strong>Brasil</strong>
                <div className={styles.team__image}>
                  <Image
                    src="/teams/brazil.svg"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className={styles.score}>
                <p className={game === 2 ? styles.winner : ''}>
                  {game === 2 ? 7 : '-'}
                </p>
                <strong>x</strong>
                <p className={game === 2 ? styles.loser : ''}>
                  {game === 2 ? 1 : '-'}
                </p>
              </div>

              <div className={styles.team}>
                <div className={styles.team__image}>
                  <Image
                    src="/teams/alemanha.svg"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <strong>Alemanha</strong>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default HomePage
