import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { FormProvider, useForm } from 'react-hook-form'

import { useBet } from 'hook/useBet'
import { Input } from 'components/Form'
import styles from './styles.module.scss'

export const BetForm = () => {
  const { onSubmit, isOpen, handleCloseBet, selectedMatch, isLoading } =
    useBet()

  const formMethods = useForm()

  useEffect(() => {
    formMethods.reset()
  }, [selectedMatch])

  return (
    <div className={styles.container} aria-hidden={!isOpen}>
      {selectedMatch && (
        <FormProvider {...formMethods}>
          <form
            className={styles.form}
            onSubmit={formMethods.handleSubmit(onSubmit)}
          >
            <button
              type="button"
              className={styles.close}
              onClick={handleCloseBet}
            >
              <FaTimes />
            </button>

            <h1>Criar pitaco</h1>

            <fieldset className={styles.team}>
              <label htmlFor="scoreTeamA">{selectedMatch.teamA.name}</label>
              <Input name="teamA" defaultValue={selectedMatch.teamA.score} />
            </fieldset>

            <fieldset className={styles.team}>
              <label htmlFor="scoreTeamB">{selectedMatch.teamB.name}</label>
              <Input name="teamB" defaultValue={selectedMatch.teamB.score} />
            </fieldset>

            <button className={styles.button__submit} type="submit">
              Enviar pitaco
            </button>

            {isLoading && <div className={styles.loading} />}
          </form>
        </FormProvider>
      )}
    </div>
  )
}
