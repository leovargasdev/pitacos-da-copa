import { useRouter } from 'next/router'
import { HiRefresh } from 'react-icons/hi'
import { FormEvent, useState } from 'react'
import { getSession } from 'next-auth/react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { GetServerSideProps, NextPage } from 'next'
import { FormProvider, useForm } from 'react-hook-form'

import { User } from 'types'
import api from 'service/api'
import { Input } from 'components/Form'
import { getSlugFromText } from 'utils/format/string'

import styles from './styles.module.scss'

const ProfilePage: NextPage<User> = user => {
  const router = useRouter()

  const useFormMethods = useForm({
    mode: 'all',
    defaultValues: user
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [group, setGroup] = useState<string>('')
  const [groups, setGroups] = useState<string[]>(user.groups)

  const addGroup = (e: FormEvent): void => {
    e.preventDefault()
    if (groups.length < 5) {
      setGroups(state => [...state, getSlugFromText(group)])
      setGroup('')
    }
  }

  const onSubmit = async (data: any): Promise<void> => {
    setIsLoading(true)

    try {
      await api.post('/user/update', {
        groups,
        name: data.name
      })
      router.push('/')
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const removeGroup = (groupName: string): void => {
    setGroups(state => state.filter(g => g !== groupName))
  }

  return (
    <section className={styles.container}>
      <FormProvider {...useFormMethods}>
        <form className={styles.form} onSubmit={addGroup}>
          <h2>Informações gerais</h2>

          <fieldset>
            <label>Nome completo</label>
            <Input name="name" type="text" placeholder="Nome de usuário" />
          </fieldset>

          <fieldset>
            <label>
              Seus grupos <small>(limitado em 5 grupos)</small>
            </label>
            <div className={styles.user__groups}>
              <Input
                type="text"
                name="groupName"
                value={group}
                maxLength={30}
                placeholder="Nome do grupo"
                onChange={e => setGroup(e.target.value)}
              />
              <button type="submit" onClick={addGroup}>
                <FaPlus />
                Adicionar
              </button>
            </div>

            <ul className={styles.groups}>
              {groups.map(groupName => (
                <li key={groupName}>
                  {groupName}
                  <button type="button" onClick={() => removeGroup(groupName)}>
                    <FaTimes size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>

          <button
            type="button"
            disabled={isLoading}
            className={styles.button__submit}
            onClick={useFormMethods.handleSubmit(onSubmit)}
          >
            <HiRefresh />
            Salvar dados
          </button>

          {/* <h2>Seus pitacos</h2> */}
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
