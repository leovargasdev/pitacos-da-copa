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
      console.log(user)
      await connectMongoose()

      const isUser = await UserModel.findOneAndUpdate(
        { email: user.email },
        user
      )

      if (!isUser) {
        // novo usuário
        await UserModel.create(user)
      }

      await disconnectMongoose()

      return true
    },
    async session({ session }) {
      await connectMongoose()

      const { user } = session

      if (user) {
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

      await disconnectMongoose()

      return session
    }
  }
})
