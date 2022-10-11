import { Types } from 'mongoose'

export type UserRole = 'admin' | 'participant'

export interface User {
  _id: Types.ObjectId
  name: string
  email: string
  image: string
  role: UserRole
}
