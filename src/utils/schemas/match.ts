import { Match } from 'types'
import { Schema } from 'mongoose'

export const MatchSchema = new Schema<Match>(
  {
    team_a: {
      type: String,
      required: true
    },
    team_b: {
      type: String,
      required: true
    },
    score_team_a: {
      type: Number,
      required: true,
      default: 0
    },
    score_team_b: {
      type: Number,
      required: true,
      default: 0
    },
    type: String,
    date: Date
  },
  {
    timestamps: true
  }
)
