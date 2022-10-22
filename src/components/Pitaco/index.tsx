import { Input } from 'components/Form'
import { FormProvider, useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'

import styles from './styles.module.scss'

export const Pitaco = () => {
  const formMethods = useForm({
    mode: 'all',
    defaultValues: {}
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className={styles.container}>
      <FormProvider {...formMethods}>
        <form
          className={styles.form}
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <button type="button" className={styles.close}>
            <FaTimes />
          </button>

          <h1>Criar pitaco</h1>

          <fieldset className={styles.team}>
            <label htmlFor="">Brasil</label>
            <Input name="teamA" />
          </fieldset>

          <fieldset className={styles.team}>
            <label htmlFor="">Estados Unidos</label>
            <Input name="teamB" />
          </fieldset>

          <button className={styles.button__submit}>Enviar pitaco</button>
        </form>
      </FormProvider>
    </div>
  )
}
