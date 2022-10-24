import { addHours, isPast } from 'date-fns'
import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'

import { BetModel, connectMongoose, disconnectMongoose } from 'service/mongoose'

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

  const matchDate = addHours(new Date(req.body.match_date), 2)

  if (isPast(matchDate)) {
    return res.status(401).send('The betting period has ended')
  }

  const user_id = session.user._id

  try {
    const bet = req.body
    let winnerTeam = 'draw'

    if (bet.scoreTeamA > bet.scoreTeamB) winnerTeam = 'teamA'
    else if (bet.scoreTeamA < bet.scoreTeamB) winnerTeam = 'teamB'

    await connectMongoose()

    const newBet = { ...bet, user_id, winnerTeam }

    const isBet = await BetModel.findOneAndUpdate(
      { user_id, match_id: bet.match_id },
      newBet
    )

    if (!isBet) {
      await BetModel.create(newBet)
    }

    await disconnectMongoose()

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.log(err)

    return res.status(500).send('Internal Server Error')
  }
}
