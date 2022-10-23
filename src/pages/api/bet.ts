import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'

import { BetModel, connectMongoose, MatchModel } from 'service/mongoose'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
    return
  }

  try {
    const bet = req.body
    let winnerTeam = 'draw'

    if (bet.scoreTeamA > bet.scoreTeamB) winnerTeam = 'teamA'
    else if (bet.scoreTeamA < bet.scoreTeamB) winnerTeam = 'teamB'

    // const session = await getSession({ req })

    // if (!session?.user) {
    //   return res.status(401).send('Unauthorized')
    // }

    await connectMongoose()

    const newBet = {
      ...bet,
      user_id: '6344b6806de81ef93fbfd972',
      winnerTeam
    }

    console.log(newBet)

    // const isBet = await BetModel.findOneAndUpdate(
    //   { user_id: '6344b6806de81ef93fbfd972', match_id: bet.match_id },
    //   newBet
    // )

    // // Primeiro envio
    // if (!isBet) {
    //   await BetModel.create(newBet)
    // }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.log(err)

    return res.status(500).send('Internal Server Error')
  }
}
