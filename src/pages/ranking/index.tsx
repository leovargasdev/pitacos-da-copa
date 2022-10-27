import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { BetModel, connectMongoose } from 'service/mongoose'
import { User } from 'types'

import styles from './styles.module.scss'

interface Ranking {
  _id: string
  points: number
  user: User
}

interface PageProps {
  ranking: Ranking[]
}

const RankingPage: NextPage<PageProps> = ({ ranking }) => (
  <div className={styles.container}>
    <h1>Ranking</h1>

    <ul className={styles.ranking}>
      {ranking.map((item, index) => (
        <li key={item._id}>
          <span className={styles.position}>{index + 1}</span>

          <div className={styles.content}>
            <div className={styles.user__image}>
              <Image
                src={item.user.image}
                layout="fill"
                objectFit="cover"
                alt="Imagem do usuário"
              />
            </div>
            <strong>{item.user.name}</strong>
          </div>

          <p className={styles.points}>
            <b>{item.points}</b>
            <small>pontos</small>
          </p>
        </li>
      ))}
    </ul>
  </div>
)

export const getStaticProps: GetStaticProps = async () => {
  await connectMongoose()

  let ranking = await BetModel.aggregate([
    { $group: { _id: '$user_id', points: { $sum: '$points' } } },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
        pipeline: [
          { $project: { createdAt: 0, updatedAt: 0, _id: 0, role: 0 } }
        ]
      }
    },
    { $unwind: '$user' },
    { $sort: { points: -1 } }
  ])

  ranking = ranking.map(r => ({ ...r, _id: String(r._id) }))

  return {
    props: { ranking },
    revalidate: 60 * 60
  }
}

export default RankingPage
