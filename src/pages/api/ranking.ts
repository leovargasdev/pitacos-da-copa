import type { NextApiResponse, NextApiRequest } from 'next'

import { connectMongoose, BetModel } from 'service/mongoose'

const fieldsIgnore = { createdAt: 0, updatedAt: 0, _id: 0, role: 0, email: 0 }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (String(req.method) !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
    return
  }

  await connectMongoose()

  const isGroup = req.query?.group
  const filterGroup = isGroup ? { 'user.groups': { $in: [isGroup] } } : {}

  let ranking = await BetModel.aggregate([
    { $group: { _id: '$user_id', points: { $sum: '$points' } } },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
        pipeline: [{ $project: fieldsIgnore }]
      }
    },
    { $unwind: '$user' },
    { $sort: { points: -1 } },
    { $match: { ...filterGroup } }
  ])

  ranking = ranking.map(r => ({ ...r, _id: String(r._id) }))

  return res.status(200).json(ranking)
}
