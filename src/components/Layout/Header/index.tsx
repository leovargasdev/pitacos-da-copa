import Image from 'next/image'
import styles from './styles.module.scss'

export const Header = () => (
  <header className={styles.layout__header}>
    <div className={styles.layout__headerContent}>
      <Image
        src="/logo.png"
        width={140}
        height={70}
        layout="intrinsic"
        objectFit="contain"
      />

      <nav>
        <ul>
          <li className={styles.active}>Home</li>
          <li>Grupos</li>
          <li>Ranking</li>
          <li>Perfil</li>
        </ul>
      </nav>

      <button type="button" className={styles.signIn}>
        Acessar conta
      </button>
    </div>
  </header>
)
