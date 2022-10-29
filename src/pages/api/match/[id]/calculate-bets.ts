import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'

import { Bet, Match } from 'types'
import { calculetePoints } from 'utils/bet'
import { BetModel, connectMongoose } from 'service/mongoose'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
    return
  }

  const session = await getSession({ req })

  if (session?.user && session.user.role !== 'admin') {
    return res.status(401).send('Unauthorized')
  }

  try {
    const match_id = req.query.id
    const match: Match = req.body

    await connectMongoose()

    const bets: Bet[] = await BetModel.find({ match_id })

    bets.forEach(async bet => {
      await BetModel.findOneAndUpdate(
        { _id: bet._id },
        {
          points: calculetePoints(bet, match),
          public: true
        }
      )
    })
  } catch (err) {
    console.log(err)
  }

  return res.status(200).json({ ok: true })
}
