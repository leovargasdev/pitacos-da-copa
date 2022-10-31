import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa'
import { signIn, getSession } from 'next-auth/react'

import { SEO } from 'components/SEO'

import styles from './styles.module.scss'

const LoginPage = () => (
  <div className={styles.container}>
    <SEO
      tabName="Acessar conta"
      title="Faça login na plataforma pitacos da copa 2022"
    />

    <figure className={styles.image}>
      <Image
        src="/login-background.jpg"
        layout="fill"
        objectFit="cover"
        objectPosition="top"
      />
    </figure>

    <h1>Seja bem-vindo, faça login para acessar a sua conta.</h1>

    <hr />

    <div className={styles.buttons}>
      <button
        type="button"
        className={styles.google}
        onClick={() => signIn('google')}
      >
        <FaGoogle />
        Entrar com Google
      </button>

      <button
        type="button"
        className={styles.facebook}
        onClick={() => signIn('facebook')}
      >
        <FaFacebookSquare />
        Entrar com Facebook
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
