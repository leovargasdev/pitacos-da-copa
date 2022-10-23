import Image from 'next/image'
import styles from './styles.module.scss'

interface CardTeamProps {
  name: string
  image: string
  score: number
  isFinished: boolean
}

export const CardTeam = ({ name, image, score, isFinished }: CardTeamProps) => (
  <div className={styles.card}>
    <div className={styles.card__content}>
      <div className={styles.image}>
        <div className={styles.image__content}>
          <Image src={image} layout="fill" objectFit="cover" />
        </div>
      </div>
      <strong>{name}</strong>
    </div>
    <span className={styles.score}>{score || '-'}</span>
  </div>
)
