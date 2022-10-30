import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

import options from './options.json'
import styles from './styles.module.scss'

interface FilterTypeMatchProps {
  onFilter: (optionId: string) => void
}

interface Option {
  id: string
  name: string
}

export const FilterTypeMatch = ({ onFilter }: FilterTypeMatchProps) => {
  const [active, setActive] = useState<boolean>(true)
  const [optionSelected, setOptionSelected] = useState<string>('')

  const onSelectedOption = (option: Option) => {
    onFilter(option.id)
    setOptionSelected(option.name === 'Todas' ? '' : option.name)
    setActive(false)
  }

  return (
    <div className={styles.container}>
      <label
        className={active ? styles.active : ''}
        onClick={() => setActive(state => !state)}
      >
        {optionSelected || 'Filtrar jogos'}
        <FaChevronDown />
      </label>
      <ul className={`${styles.options} ${active ? styles.active : ''} scroll`}>
        {options.map(option => (
          <li
            key={option.id}
            onClick={() => onSelectedOption(option)}
            aria-selected={option.name === optionSelected}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
