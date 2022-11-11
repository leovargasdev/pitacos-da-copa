import {
  FaFacebookSquare,
  FaCheck,
  FaTwitterSquare,
  FaWhatsappSquare
} from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import api from 'service/api'
import { Ranking } from 'types'
import { SEO } from 'components/SEO'
import { getRanking } from 'utils/ranking'
import { ListRanking } from 'components/ListRanking'

import styles from './styles.module.scss'

interface PageProps {
  group: {
    slug: string
    name: string
  }
  ranking: Ranking[]
}

const RankingPage: NextPage<PageProps> = ({ ranking, group }) => {
  const { status, data } = useSession()
  const isAuth = status === 'authenticated'
  const isParticipant = data?.user.groups.includes(group.slug)

  const addGroupInProfile = async () => {
    if (!isParticipant && data) {
      const groups = [...data.user.groups, group.slug]

      await api.post('/user/update', {
        groups
      })
    }
  }

  return (
    <>
      <SEO
        tabName="Ranking"
        title={`Ranking do grupo ${group.name}`}
        description="Confira a lista dos melhores pitaqueiros!"
      />

      <section className={styles.info}>
        <div>
          <h1>Grupo: {group.name}</h1>
          <p>Total de participantes: {ranking.length}</p>
        </div>

        <aside className={styles.buttons}>
          <div className={styles.share}>
            <button type="button">
              <FaFacebookSquare />
            </button>
            <button type="button">
              <FaTwitterSquare />
            </button>
            <button type="button">
              <FaWhatsappSquare />
            </button>
          </div>

          {isParticipant ? (
            <span className={styles.add__group}>
              <FaCheck />
              Participando
            </span>
          ) : (
            <button
              type="button"
              disabled={!isAuth}
              className={styles.add__group}
              onClick={addGroupInProfile}
              title={
                isAuth ? 'participar do grupo' : 'É necessário fazer login'
              }
            >
              Participar do grupo
            </button>
          )}
        </aside>
      </section>

      <ListRanking ranking={ranking} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: 'blocking', paths: [] }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const group = params?.group as string

  const ranking = await getRanking(group)

  const isEmptyGroup = ranking.length === 0

  if (isEmptyGroup) {
    return { props: {}, redirect: { destination: '/ranking' } }
  }

  return {
    props: {
      ranking,
      group: {
        slug: group,
        name: group.replace(/-/g, ' ')
      }
    },
    revalidate: 10
  }
}

export default RankingPage
