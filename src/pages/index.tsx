import Image from 'next/image'
import { GetServerSideProps, NextPage } from 'next'
import { HiOutlineClock, HiCalendar } from 'react-icons/hi'

import api from 'service/api'
import { ListTeams } from 'components/ListTeams'
import { MatchModel, connectMongoose } from 'service/mongoose'

import { Match } from 'types'
import teams from 'data/team.json'
import styles from 'styles/home.module.scss'

interface PageProps {
  matchs: Match[]
}

const HomePage: NextPage<PageProps> = ({ matchs }) => (
  <div className={styles.container}>
    <ListTeams />

    <div className={styles.games}>
      <h1>Lista dos jogos</h1>

      <ul>
        {matchs.map(match => (
          <li key={match._id} className={styles.game}>
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
                <strong>{teams[match.team_a]?.name}</strong>
                <div className={styles.team__image}>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={teams[match.team_a]?.image}
                  />
                </div>
              </div>

              <div className={styles.score}>
                <p>-</p>
                <strong>x</strong>
                <p>-</p>
              </div>

              <div className={styles.team}>
                <div className={styles.team__image}>
                  <Image
                    src={teams[match.team_b]?.image}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <strong>{teams[match.team_b]?.name}</strong>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export const getServerSideProps: GetServerSideProps = async () => {
  await connectMongoose()

  const matchs = await MatchModel.find()

  const aa = matchs.map(match => ({
    ...match._doc,
    _id: match._doc._id.toString(),
    date: match._doc.date.toString(),
    createdAt: match._doc.createdAt.toString(),
    updatedAt: match._doc.updatedAt.toString()
  }))

  console.log(aa)

  return {
    props: {
      matchs: aa
    }
  }
}

export default HomePage
