import { useState } from 'react'
import { IoGrid, IoListSharp } from 'react-icons/io5'

import styles from './styles.module.scss'

export const ViewControl = () => {
  const [view, setView] = useState('list')

  return (
    <div className={styles.container__viewControl}>
      <button
        type="button"
        onClick={() => setView('list')}
        aria-selected={view === 'list'}
      >
        <IoListSharp size={18} />
      </button>
      <button
        type="button"
        onClick={() => setView('grid')}
        aria-selected={view === 'grid'}
      >
        <IoGrid size={14} />
      </button>
    </div>
  )
}
