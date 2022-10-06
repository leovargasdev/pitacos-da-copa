import { Game } from 'components/Game'
import { NextPage } from 'next'

import styles from 'styles/home.module.scss'

const HomePage: NextPage = () => (
  <div className={styles.container}>
    <h1>Listagem dos jogos</h1>

    <ul>{/* <Game /> */}</ul>
  </div>
)

export default HomePage
