import { IoMdTrophy } from 'react-icons/io'
import { GetStaticProps, NextPage } from 'next'

import { Ranking } from 'types'
import { SEO } from 'components/SEO'
import { ListRanking } from 'components/ListRanking'
import { SearchGroup } from 'components/Form/SearchGroup'

import styles from './styles.module.scss'
import { getRanking } from 'utils/ranking'

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
  const ranking = await getRanking()

  return {
    props: { ranking },
    revalidate: 60 * 2
  }
}

export default RankingPage
