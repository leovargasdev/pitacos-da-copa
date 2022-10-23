import { Match } from 'types'
import { FormProvider, useForm } from 'react-hook-form'

import api from 'service/api'
import { Input } from '../Input'
import styles from './styles.module.scss'

export const UpdateMatch = (match: Match) => {
  const formMethods = useForm({ mode: 'all', defaultValues: match })

  const onSubmit = async (data: any) => {
    const updateMatch = {
      ...match,
      type: data.type,
      teamA: { ...match.teamA, score: Number(data.teamA.score) },
      teamB: { ...match.teamB, score: Number(data.teamB.score) }
    }

    await api.put('/match', updateMatch)
  }

  return (
    <FormProvider {...formMethods}>
      <form
        className={styles.match}
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
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
          Atualizar jogo
        </button>
      </form>
    </FormProvider>
  )
}
