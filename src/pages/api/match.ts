import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'

import {
  connectMongoose,
  disconnectMongoose,
  MatchModel
} from 'service/mongoose'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
    return
  }

  const session = await getSession({ req })

  if (!session?.user && session?.user.role !== 'admin') {
    return res.status(401).send('Unauthorized')
  }

  try {
    await connectMongoose()

    const match = await MatchModel.create(req.body)

    await disconnectMongoose()

    return res.status(200).json({
      _id: match._id.toString(),
      ...req.body
    })
  } catch (err) {
    console.log(err)

    return res.status(500).send('Internal Server Error')
  }
}
