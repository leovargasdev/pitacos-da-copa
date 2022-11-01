import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'
import { connectMongoose, UserModel } from 'service/mongoose'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
    return
  }

  const session = await getSession({ req })

  if (!session?.user) {
    return res.status(401).send('Unauthorized')
  }

  await connectMongoose()

  await UserModel.updateOne({ _id: session.user._id }, req.body)

  return res.status(200).json({ ok: true })
}
