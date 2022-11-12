import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

import {
  UserModel,
  connectMongoose,
  disconnectMongoose,
  BetModel
} from 'service/mongoose'

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      httpOptions: {
        timeout: 10000
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      httpOptions: {
        timeout: 10000
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      await connectMongoose()

      const isUser = await UserModel.findOne({ email: user.email })

      if (!isUser) {
        await UserModel.create(user)
      }

      await disconnectMongoose()

      return true
    },
    async session({ session }) {
      const { user } = session

      if (user) {
        await connectMongoose()
        const userMongo = await UserModel.findOne({ email: user.email })

        const betsMongo = await BetModel.find({ user_id: userMongo._id })

        const bets = betsMongo.reduce((acc, bet) => {
          const matchId = String(bet.match_id)

          acc[matchId] = {
            points: bet.points,
            scoreTeamA: bet.scoreTeamA,
            scoreTeamB: bet.scoreTeamB
          }

          return acc
        }, {})

        await disconnectMongoose()

        return {
          ...session,
          user: {
            ...user,
            ...userMongo._doc,
            bets
          }
        }
      }

      return session
    }
  }
})
