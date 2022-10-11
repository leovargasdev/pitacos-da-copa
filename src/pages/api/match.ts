import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'

import { connectMongoose, MatchModel } from 'service/mongoose'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
    return
  }

  try {
    const session = await getSession({ req })

    if (!session?.user) {
      return res.status(401).send('Unauthorized')
    }

    await connectMongoose()

    await MatchModel.create({
      team_a: 'brasil',
      team_b: 'alemanha',
      score_team_a: 0,
      score_team_b: 0,
      type: 'group-a',
      date: new Date()
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.log(err)

    return res.status(500).send('Internal Server Error')
  }
}
