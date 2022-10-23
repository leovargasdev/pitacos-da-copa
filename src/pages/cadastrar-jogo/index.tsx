import { useState } from 'react'
import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'
import { FormProvider, useForm } from 'react-hook-form'

import api from 'service/api'
import { Match } from 'types'
import { getMatches } from 'utils/format/match'
import { Input, SelectTeams, UpdateMatch } from 'components/Form'

import styles from './styles.module.scss'

interface PageProps {
  matches: Match[]
}

const CreateMatchesPape: NextPage<PageProps> = ({ matches: data }) => {
  const [matches, setMatches] = useState<Match[]>(data)

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
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx)

  if (!session?.user || session.user.role !== 'admin') {
    return {
      props: {},
      redirect: {
        destination: '/'
      }
    }
  }

  const matches = await getMatches('normal')

  return { props: { matches } }
}

export default CreateMatchesPape
