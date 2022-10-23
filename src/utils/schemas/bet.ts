import { Bet } from 'types'
import { Schema } from 'mongoose'

export const BetSchema = new Schema<Bet>(
  {
    user_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
      $exists: true
    },
    match_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Match',
      $exists: true
    },
    points: {
      type: Number,
      default: 0
    },
    scoreTeamA: Number,
    scoreTeamB: Number,
    winnerTeam: {
      type: String,
      required: true,
      enum: ['draw', 'teamA', 'teamB']
    }
  },
  {
    timestamps: true
  }
)
