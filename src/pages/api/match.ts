import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'

import {
  connectMongoose,
  disconnectMongoose,
  MatchModel
} from 'service/mongoose'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!['POST', 'PUT'].includes(String(req.method))) {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
    return
  }

  const session = await getSession({ req })

  if (!session?.user && session?.user.role !== 'admin') {
    return res.status(401).send('Unauthorized')
  }

  try {
    let _id = req.body?._id || ''

    await connectMongoose()

    if (req.method === 'PUT') {
      await MatchModel.updateOne({ _id }, req.body)
    } else {
      const match = await MatchModel.create(req.body)
      _id = match._id.toString()
    }

    await disconnectMongoose()

    return res.status(200).json({ _id, ...req.body })
  } catch (err) {
    console.log(err)

    return res.status(500).send('Internal Server Error')
  }
}
