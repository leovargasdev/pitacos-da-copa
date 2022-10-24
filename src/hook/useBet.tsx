import React, { createContext, useContext, useState } from 'react'

import api from 'service/api'
import { Match } from 'types'
import { BetForm } from 'components/BetForm'

interface BetContextData {
  isOpen: boolean
  isLoading: boolean
  onSubmit: (data: any) => void
  handleOpenBet: (match: Match) => void
  handleCloseBet: () => void
  selectedMatch: Match | null
}

const BetContext = createContext({} as BetContextData)

interface ProviderProps {
  children: React.ReactNode
  updateMatch: (value: any) => void
}

export const BetProvider = ({ children, updateMatch }: ProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)

  const handleOpenBet = (match: Match): void => {
    setSelectedMatch(match)
    setIsOpen(true)
  }

  const handleCloseBet = (): void => {
    setIsOpen(false)
  }

  const onSubmit = async (data: any) => {
    setLoading(true)

    try {
      const bet = {
        match_date: selectedMatch?.date,
        match_id: selectedMatch?._id,
        scoreTeamA: Number(data.teamA),
        scoreTeamB: Number(data.teamB)
      }

      await api.post('/bet', bet)

      updateMatch(bet)
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
    handleCloseBet()
  }

  return (
    <BetContext.Provider
      value={{
        handleOpenBet,
        isOpen,
        onSubmit,
        handleCloseBet,
        selectedMatch,
        isLoading
      }}
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
