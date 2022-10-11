import { BsFillCalendarFill } from 'react-icons/bs'
import { CardTeam } from 'components/CardTeam'

import styles from './styles.module.scss'

const teams = [
  { image: '/team/argentina.svg', name: 'argentina' },
  { image: '/team/alemanha.svg', name: 'alemanha' },
  { image: '/team/brasil.svg', name: 'brasil' },
  { image: '/team/Catar.svg', name: 'Catar' },
  { image: '/team/canada.svg', name: 'canada' },
  { image: '/team/belgica.svg', name: 'belgica' }
]

export const Matchs = () => (
  <section className={styles.matchs}>
    {teams.slice(0, 4).map((team, index) => (
      <article key={team.name} className={styles.match}>
        <header className={styles.match__header}>
          <span>Grupo A</span>
          <time>
            <BsFillCalendarFill size={14} /> Dom 15/07 12h00
          </time>
        </header>

        <div className={styles.match__content}>
          <CardTeam {...team} score={2} />
          <CardTeam {...teams[index + 1]} score={4} />
        </div>

        <button className={styles.bet}>Dar palpite</button>
      </article>
    ))}
  </section>
)
