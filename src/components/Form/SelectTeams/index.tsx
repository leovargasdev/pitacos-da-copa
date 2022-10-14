import Image from 'next/image'
import * as Select from '@radix-ui/react-select'
import { FaChevronDown, FaCheck } from 'react-icons/fa'

import teams from 'data/teams.json'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

type KeyTeam = keyof typeof teams
const keyTeams = Object.keys(teams) as KeyTeam[]

const Option = (team: any) => (
  <Select.Item value={team.id} className={styles.item}>
    <Select.ItemText className={styles.item__option}>
      <Image src={team.image} width={40} height={18} />
      {team.name}
    </Select.ItemText>

    <Select.ItemIndicator>
      <FaCheck />
    </Select.ItemIndicator>
  </Select.Item>
)

interface SelectTeamsProps {
  name: string
}

export const SelectTeams = ({ name }: SelectTeamsProps) => {
  const { setValue } = useFormContext()
  const [selectedTeam, setSeletedTeam] = useState('Selecionar time')

  useEffect(() => {
    if (selectedTeam !== 'Selecionar time') {
      setValue(name, selectedTeam)
    }
  }, [selectedTeam])

  return (
    <Select.Root value={selectedTeam} onValueChange={setSeletedTeam}>
      <Select.Trigger className={styles.trigger}>
        <Select.Value aria-label={selectedTeam}>
          {teams[selectedTeam as KeyTeam] && (
            <Image
              src={teams[selectedTeam as KeyTeam].image}
              width={40}
              height={18}
            />
          )}
          {teams[selectedTeam as KeyTeam]?.name || selectedTeam}
        </Select.Value>

        <Select.Icon className={styles.trigger__icon}>
          <FaChevronDown size={14} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={styles.content}>
          <Select.ScrollUpButton />

          <Select.Viewport className={styles.viewport}>
            {keyTeams.map(team => (
              <Option key={team} {...teams[team]} />
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
