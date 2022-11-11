import { Match } from 'types'
import { FormProvider, useForm } from 'react-hook-form'

import api from 'service/api'
import { Input } from '../Input'
import styles from './styles.module.scss'
import { formatDate } from 'utils/format/date'
import { isPast } from 'date-fns'
import { getWinner } from 'utils/bet'

const status = {
  active: 'Ativo',
  finished: 'Finalizado',
  progress: 'Andamento'
}

// FUNCIONALIDADE
// -> Atualizar a lista de jogos com as novas informações

export const UpdateMatch = (match: Match) => {
  const formMethods = useForm({ mode: 'all', defaultValues: match })

  const onSubmit = async (data: any) => {
    const winnerTeam = getWinner(
      Number(data.teamA.score),
      Number(data.teamB.score)
    )

    const isFinished = isPast(new Date(match.date))

    const updateMatch = {
      ...match,
      type: data.type,
      winnerTeam,
      status: isFinished ? 'finished' : 'active',
      teamA: { ...match.teamA, score: Number(data.teamA.score) },
      teamB: { ...match.teamB, score: Number(data.teamB.score) }
    }

    await api.put('/match', updateMatch)

    if (isFinished) {
      await api.post(`/match/${match._id}/calculate-bets`, updateMatch)
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form
        className={`${styles.match} ${styles[match.status]}`}
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <header className={styles.header}>
          <span>{status[match.status]}</span>
          <time className={styles.match__date}>
            {formatDate(match.date, 'normal')}
          </time>
        </header>
        <Input name="type" />

        <div className={styles.team}>
          <strong>{match.teamA.id}</strong>
          <Input name="teamA.score" type="number" />
        </div>

        <div className={styles.team}>
          <strong>{match.teamB.id}</strong>
          <Input name="teamB.score" type="number" />
        </div>

        <button className={styles.button__submit} type="submit">
          {match.status === 'active' ? 'Atualizar jogo' : 'Recalcular pontos'}
        </button>
      </form>
    </FormProvider>
  )
}
