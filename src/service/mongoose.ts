import { model, connect, models } from 'mongoose'
import { UserSchema, MatchSchema } from 'utils/schemas'

const MONGODB_URI = process.env.MONGODB_URI || ''
const MONGODB_DB = process.env.MONGODB_DB || ''

const urlMongo = MONGODB_URI + MONGODB_DB

const UserModel = models.User || model('User', UserSchema)
const MatchModel = models.Match || model('Match', MatchSchema)

async function connectMongoose() {
  await connect(urlMongo)
}

export { connectMongoose, UserModel, MatchModel }
