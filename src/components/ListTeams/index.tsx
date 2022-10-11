import Image from 'next/image'
import { BiWorld } from 'react-icons/bi'

import styles from './styles.module.scss'

import teams from 'data/team.json'

const teamsSlugs = Object.keys(teams)

export const ListTeams = () => (
  <div className={styles.teams}>
    <h1>
      <BiWorld />
      Lista das seleções
    </h1>

    <ul>
      {teamsSlugs.map((team: string) => (
        <li key={teams[team].id} className={styles.team}>
          <div className={styles.team__image}>
            <Image src={teams[team].image} layout="fill" objectFit="cover" />
          </div>
          <strong>{teams[team].name}</strong>
        </li>
      ))}
    </ul>
  </div>
)
