import { IoMdTrophy } from 'react-icons/io'
import { GetStaticProps, NextPage } from 'next'
import { BetModel, connectMongoose } from 'service/mongoose'

import { Ranking } from 'types'
import { SEO } from 'components/SEO'
import { ListRanking } from 'components/ListRanking'
import { SearchGroup } from 'components/Form/SearchGroup'

import styles from './styles.module.scss'

interface PageProps {
  ranking: Ranking[]
}

const RankingPage: NextPage<PageProps> = ({ ranking }) => (
  <>
    <SEO
      tabName="Ranking"
      title="Ranking geral"
      description="Confira a lista dos melhores pitaqueiros!"
    />

    <div className={styles.info}>
      <div>
        <h1>
          <IoMdTrophy /> Ranking
        </h1>
        <p>Confira a lista dos melhores pitaqueiros!</p>
      </div>

      <SearchGroup />
    </div>

    <ListRanking ranking={ranking} />
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  await connectMongoose()

  const ignoreFields = { createdAt: 0, updatedAt: 0, _id: 0, role: 0 }
  let ranking = await BetModel.aggregate([
    { $group: { _id: '$user_id', points: { $sum: '$points' } } },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
        pipeline: [{ $project: ignoreFields }]
      }
    },
    { $unwind: '$user' },
    { $sort: { points: -1 } }
  ])

  ranking = ranking.map(r => ({ ...r, _id: String(r._id) }))

  return {
    props: { ranking },
    revalidate: 60 * 60 * 6
  }
}

export default RankingPage
