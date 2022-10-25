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

  const formatScore = (fieldName: string, value: string) => {
    const formattedValue = value.replace(/\D/g, '')
    formMethods.setValue(fieldName, formattedValue)
  }

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

            <h1>{selectedMatch.isBet ? 'Atualizar' : 'Adicionar'} pitaco</h1>

            <fieldset className={styles.team}>
              <label htmlFor="scoreTeamA">{selectedMatch.teamA.name}</label>
              <Input
                name="teamA"
                defaultValue={selectedMatch.teamA.score}
                maxLength={2}
                onChange={e => formatScore('teamA', e.target.value)}
              />
            </fieldset>

            <fieldset className={styles.team}>
              <label htmlFor="scoreTeamB">{selectedMatch.teamB.name}</label>
              <Input
                name="teamB"
                defaultValue={selectedMatch.teamB.score}
                maxLength={2}
                onChange={e => formatScore('teamB', e.target.value)}
              />
            </fieldset>

            <button className={styles.button__submit} type="submit">
              Salvar pitaco
            </button>

            {isLoading && <div className={styles.loading} />}
          </form>
        </FormProvider>
      )}
    </div>
  )
}
