import { GetServerSideProps } from 'next'

import styles from './styles.module.scss'

const RankingPage = () => (
  <div className={styles.container}>
    <h1>olar</h1>
  </div>
)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {}
  }
}

export default RankingPage
