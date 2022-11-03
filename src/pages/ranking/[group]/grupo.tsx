import { MdGroups } from 'react-icons/md'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Ranking } from 'types'
import { SEO } from 'components/SEO'
import { ListRanking } from 'components/ListRanking'
import { BetModel, connectMongoose } from 'service/mongoose'

import styles from './styles.module.scss'

interface PageProps {
  groupName: string
  ranking: Ranking[]
}

const RankingPage: NextPage<PageProps> = ({ ranking, groupName }) => (
  <>
    <SEO
      tabName="Ranking"
      title={`Ranking do grupo ${groupName}`}
      description="Confira a lista dos melhores pitaqueiros!"
    />

    <div className={styles.info}>
      <span>
        <MdGroups /> Ranking do grupo
      </span>
      <h1>{groupName}</h1>
      <p>Total de participantes: {ranking.length}</p>
    </div>

    <ListRanking ranking={ranking} />
  </>
)

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: 'blocking', paths: [] }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.group) {
    return { props: {}, redirect: { destination: '/ranking' } }
  }

  const group = params.group as string

  await connectMongoose()

  const fieldsIgnore = { createdAt: 0, updatedAt: 0, _id: 0, role: 0 }
  let ranking = await BetModel.aggregate([
    { $group: { _id: '$user_id', points: { $sum: '$points' } } },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
        pipeline: [{ $project: fieldsIgnore }]
      }
    },
    { $unwind: '$user' },
    { $sort: { points: -1 } },
    { $match: { 'user.groups': { $in: [group] } } }
  ])

  ranking = ranking.map(r => ({ ...r, _id: String(r._id) }))

  return {
    props: { ranking, groupName: group.replace(/-/g, ' ') },
    revalidate: 60 * 2
  }
}

export default RankingPage
