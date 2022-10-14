import { FormProvider, useForm } from 'react-hook-form'
import { Input, SelectTeams, UpdateMatch } from 'components/Form'

import styles from './styles.module.scss'
import api from 'service/api'
import { useState } from 'react'
import { Match } from 'types'
import matchesMock from 'data/matches.json'

const CreateGamePape = () => {
  const [matches, setMatches] = useState<Match[]>(
    matchesMock as unknown as Match[]
  )

  const formMethods = useForm({
    mode: 'all',
    defaultValues: {
      teamA: 'Selecionar time',
      teamB: 'Selecionar time',
      date: '',
      type: ''
    }
  })

  const onSubmit = async (data: any) => {
    const match = {
      ...data,
      teamA: { id: data.teamA, score: 0 },
      teamB: { id: data.teamB, score: 0 },
      date: new Date(data.date)
    }

    try {
      const response = await api.post('/match', match)
      setMatches(state => [...state, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Cadastrar jogo</h1>

      <FormProvider {...formMethods}>
        <form
          className={styles.form}
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <SelectTeams name="teamA" />
          <SelectTeams name="teamB" />

          <Input name="date" type="datetime-local" />
          <Input name="type" type="text" placeholder="Tipo do jogo" />

          <button className={styles.button__submit} type="submit">
            Cadastrar jogo
          </button>
        </form>
      </FormProvider>

      <ul className={styles.matches}>
        {matches.map(match => (
          <li key={match._id}>
            <UpdateMatch {...match} />
            {/* <input defaultValue={match.type} />

            <div className={styles.team}>
              <strong>{match.teamA.id}</strong>
              <input defaultValue={match.teamA.score} />
            </div>
            <div className={styles.team}>
              <strong>{match.teamB.id}</strong>
              <input defaultValue={match.teamB.score} />
            </div>
            <button className={styles.button__submit} type="submit">
              Atualizar jogo
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CreateGamePape
