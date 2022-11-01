import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { getSlugFromText } from 'utils/format/string'

import styles from './styles.module.scss'

export const SearchGroup = () => {
  const router = useRouter()
  const [groupName, setGroupName] = useState<string>('')

  const goToGroup = (e: FormEvent): void => {
    e.preventDefault()

    const slugGroup = getSlugFromText(groupName)
    router.push(`/ranking/${slugGroup}/grupo`)
  }

  return (
    <form onSubmit={goToGroup} className={styles.container}>
      <input
        type="text"
        placeholder="Pesquise o seu grupo"
        onChange={e => setGroupName(e.target.value)}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  )
}
