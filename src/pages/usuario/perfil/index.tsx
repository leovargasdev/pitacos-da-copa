import Link from 'next/link'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'
import { FormProvider, useForm } from 'react-hook-form'
import { HiRefresh, HiPencil, HiTrash } from 'react-icons/hi'

import { User } from 'types'
import { Input } from 'components/Form'

import styles from './styles.module.scss'
import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'

const ProfilePage: NextPage<User> = user => {
  const router = useRouter()
  const useFormMethods = useForm({
    mode: 'all',
    defaultValues: user
  })

  const [group, setGroup] = useState<string>('')
  const [groups, setGroups] = useState<string[]>([])

  const addGroup = () => {
    setGroups(state => [...state, group])
    setGroup('')
  }

  const onSubmit = async (data: any): Promise<void> => {
    try {
      console.log(data)
      // await api.post('/user/update', data)
      // toast.success('Sucesso', {
      //   description: 'Os dados foram atualizados com sucesso'
      // })
      // router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className={styles.container}>
      <FormProvider {...useFormMethods}>
        <form
          className={styles.form}
          onSubmit={useFormMethods.handleSubmit(onSubmit)}
        >
          <h2>Informações gerais</h2>

          <fieldset>
            <label>Nome completo</label>
            <Input name="name" type="text" placeholder="Nome de usuário" />
          </fieldset>

          <fieldset>
            <label>Seus grupos</label>
            <div className={styles.user__groups}>
              <Input
                type="text"
                name="groupName"
                value={group}
                placeholder="Nome do grupo"
                onChange={e => setGroup(e.target.value)}
              />
              <button type="button" onClick={addGroup}>
                <FaPlus />
                Adicionar
              </button>
            </div>

            <ul className={styles.groups}>
              {groups.map(groupName => (
                <li key={groupName}>{groupName}</li>
              ))}
            </ul>
          </fieldset>

          <h2>Seus pitacos</h2>

          <button type="submit" className={styles.button__submit}>
            <HiRefresh />
            Atualizar
          </button>
        </form>
      </FormProvider>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (!session?.user) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: session.user
  }
}

export default ProfilePage
