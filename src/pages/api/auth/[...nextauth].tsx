import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

import {
  UserModel,
  connectMongoose,
  disconnectMongoose
} from 'service/mongoose'

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async signIn({ user }) {
      await connectMongoose()

      const isUser = await UserModel.findOneAndUpdate(
        { email: user.email },
        user
      )

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
        await disconnectMongoose()

        return {
          ...session,
          user: {
            ...user,
            ...userMongo._doc
          }
        }
      }

      return session
    }
  }
})
