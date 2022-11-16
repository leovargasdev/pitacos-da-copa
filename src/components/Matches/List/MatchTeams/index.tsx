import Image from 'next/image'
import { isPast } from 'date-fns'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'

import api from 'service/api'
import { Match } from 'types'
import styles from './styles.module.scss'

interface MatchTeamsProps extends Match {
  isAuth: boolean
}

type ScoreType = number | string

export const MatchTeams = ({ isAuth, ...match }: MatchTeamsProps) => {
  const { data } = useSession()
  const isDisabledBet = isPast(new Date(match.date))

  const [debounce, setDebounce] = useState<any>(null)

  const [scoreA, setScoreA] = useState<ScoreType>('')
  const [scoreB, setScoreB] = useState<ScoreType>('')

  useEffect(() => {
    if (isAuth) {
      setScoreA(match.teamA.score)
      setScoreB(match.teamB.score)
    }
  }, [match.teamA.score, match.teamB.score])

  const handleSaveBet = async (bet: any): Promise<unknown> =>
    api.post('/bet', bet)

  const setBet = async (scoreTeamA: ScoreType, scoreTeamB: ScoreType) => {
    const user_id = data?.user._id
    if (
      user_id &&
      typeof scoreTeamA === 'number' &&
      typeof scoreTeamB === 'number'
    ) {
      const bet = {
        user_id,
        match_date: match.date,
        match_id: match._id,
        scoreTeamA: Number(scoreTeamA),
        scoreTeamB: Number(scoreTeamB)
      }

      toast.promise(handleSaveBet(bet), {
        loading: `Salvando pitaco ${match.teamA.name} X ${match.teamB.name} ...`,
        success: 'Palpite salvo com sucesso!',
        error: 'Falha ao salvar pitaco'
      })
    }
  }

  const formatScore = (type: string, value: string) => {
    if (isAuth) {
      clearTimeout(debounce)
      const formattedValue = Number(value.replace(/\D/g, ''))

      if (type === 'a') {
        setScoreA(formattedValue)
        setDebounce(setTimeout(() => setBet(formattedValue, scoreB), 2000))
      }
      if (type === 'b') {
        setScoreB(formattedValue)
        setDebounce(setTimeout(() => setBet(scoreA, formattedValue), 2000))
      }
    }
  }

  return (
    <div className={styles.match__teams}>
      <Toaster />
      <div className={styles.team}>
        <div className={styles.team__image}>
          <Image
            src={match.teamA.image}
            layout="fill"
            objectFit="cover"
            alt={`Bandeira do time ${match.teamA.name}`}
          />
        </div>

        <strong>{match.teamA.name}</strong>
        {isDisabledBet ? (
          <span>{match.result.scoreTeamA}</span>
        ) : (
          <input
            type="text"
            value={scoreA}
            disabled={!isAuth}
            maxLength={2}
            title={isAuth ? '' : 'É preciso fazer login'}
            onChange={e => formatScore('a', e.target.value)}
          />
        )}
      </div>

      <span className={styles.versus}>X</span>

      <div className={`${styles.team} ${styles.reverse}`}>
        <div className={styles.team__image}>
          <Image
            src={match.teamB.image}
            layout="fill"
            objectFit="cover"
            alt={`Bandeira do time ${match.teamB.name}`}
          />
        </div>

        <strong>{match.teamB.name}</strong>

        {isDisabledBet ? (
          <span>{match.result.scoreTeamB}</span>
        ) : (
          <input
            type="text"
            value={scoreB}
            disabled={!isAuth}
            maxLength={2}
            title={isAuth ? '' : 'É preciso fazer login'}
            onChange={e => formatScore('b', e.target.value)}
          />
        )}
      </div>
    </div>
  )
}
