import { Match } from 'types'
import { Schema } from 'mongoose'

export const MatchSchema = new Schema<Match>({
  teamA: {
    id: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true,
      default: 0
    }
  },
  teamB: {
    id: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true,
      default: 0
    }
  },
  type: String,
  date: Date,
  winnerTeam: {
    type: String,
    required: true,
    default: 'draw',
    enum: ['draw', 'teamA', 'teamB']
  },
  status: {
    type: String,
    required: true,
    default: 'active'
  }
})
