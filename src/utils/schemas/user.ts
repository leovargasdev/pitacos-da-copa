import { User } from 'types'
import { Schema } from 'mongoose'

export const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    image: String,
    groups: {
      type: [String],
      default: []
    },
    role: {
      type: String,
      required: true,
      default: 'participant'
    }
  },
  {
    timestamps: true
  }
)
