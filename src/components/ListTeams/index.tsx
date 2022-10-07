import Image from 'next/image'
import { BiWorld } from 'react-icons/bi'

import styles from './styles.module.scss'

const teams = [
  'Catar',
  'Equador',
  'Holanda',
  'Senegal',
  'Estados Unidos',
  'Inglaterra',
  'Irã',
  'País de Gales',
  'Arábia Saudita',
  'Argentina',
  'México',
  'Polônia',
  'Dinamarca',
  'Austrália',
  'França',
  'Tunísia'
]

export const ListTeams = () => (
  <div className={styles.teams}>
    <h1>
      <BiWorld />
      Lista das seleções
    </h1>

    <ul>
      {teams.map(team => (
        <li key={team} className={styles.team}>
          <div className={styles.team__image}>
            {/* <Image
            src="/escudos/brasil.png"
            layout="fill"
            objectFit="contain"
          /> */}
            <Image src="/teams/brazil.svg" layout="fill" objectFit="cover" />
          </div>
          <strong>{team}</strong>
        </li>
      ))}
    </ul>
  </div>
)
