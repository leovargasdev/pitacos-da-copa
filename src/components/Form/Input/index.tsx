import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export const Input = ({ name, ...rest }: InputProps) => {
  const { register } = useFormContext()

  return (
    <input id={name} {...register(name)} {...rest} className={styles.input} />
  )
}
