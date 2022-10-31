import { BetSchema } from 'utils/schemas/bet'
import { UserSchema, MatchSchema } from 'utils/schemas'
import { model, connect, models, disconnect } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''
const MONGODB_DB = process.env.MONGODB_DB || ''

const urlMongo = MONGODB_URI + MONGODB_DB

const UserModel = models.User || model('User', UserSchema)
const MatchModel = models.Match || model('Match', MatchSchema)
const BetModel = models.Bet || model('Bet', BetSchema)

async function connectMongoose() {
  await connect(urlMongo, { authSource: 'admin', tls: true })
}

async function disconnectMongoose() {
  await disconnect()
}

export { connectMongoose, disconnectMongoose, UserModel, MatchModel, BetModel }
