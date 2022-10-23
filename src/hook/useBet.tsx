import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useState } from 'react'

import api from 'service/api'
import { Match } from 'types'
import { BetForm } from 'components/BetForm'

interface BetContextData {
  isOpen: boolean
  onSubmit: (data: any) => void
  handleOpenBet: (match: Match) => void
  handleCloseBet: () => void
  selectedMatch: Match | null
}

const BetContext = createContext({} as BetContextData)

interface ProviderProps {
  children: React.ReactNode
}

export const BetProvider = ({ children }: ProviderProps) => {
  const { data } = useSession()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)

  const handleOpenBet = (match: Match): void => {
    console.log(data?.user._id)

    if (data?.user) {
      return
    }

    setSelectedMatch(match)
    setIsOpen(true)
  }

  const handleCloseBet = (): void => {
    setIsOpen(false)
  }

  const onSubmit = async (data: any) => {
    await api.post('/bet', {
      match_id: selectedMatch?._id,
      scoreTeamA: Number(data.teamA),
      scoreTeamB: Number(data.teamB)
    })

    handleCloseBet()
  }

  return (
    <BetContext.Provider
      value={{ handleOpenBet, isOpen, onSubmit, handleCloseBet, selectedMatch }}
    >
      {children}
      <BetForm />
    </BetContext.Provider>
  )
}

export const useBet = () => {
  const context = useContext(BetContext)

  return context
}
