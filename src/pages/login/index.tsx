import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { signIn, getSession } from 'next-auth/react'

import { SEO } from 'components/SEO'

import styles from './styles.module.scss'

const LoginPage = () => (
  <div className={styles.container}>
    <SEO tabName="Login" title="Entrar na plataforma" description="" />

    <h1>Seja bem-vindo, faça o login para acessar a sua conta.</h1>

    <hr />

    <div className={styles.buttons}>
      <button
        type="button"
        className={styles.github}
        onClick={() => signIn('facebook')}
      >
        <FaFacebook />
        Facebook
      </button>

      <button
        type="button"
        className={styles.google}
        onClick={() => signIn('google')}
      >
        <FaGoogle />
        Google
      </button>
    </div>
  </div>
)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session === null) {
    return { props: {} }
  }

  return {
    props: {},
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}

export default LoginPage
