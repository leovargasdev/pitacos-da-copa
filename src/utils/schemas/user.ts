import { User } from 'types'
import { Schema } from 'mongoose'

export const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    image: String,
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
