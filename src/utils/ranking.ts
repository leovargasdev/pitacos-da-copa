import { BetModel, connectMongoose } from 'service/mongoose'

const fieldsIgnore = { createdAt: 0, updatedAt: 0, _id: 0, role: 0, email: 0 }

export const getRanking = async (group = ''): Promise<any> => {
  await connectMongoose()

  const filterGroup = group ? { 'user.groups': { $in: [group] } } : {}

  const ranking = await BetModel.aggregate([
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

  return ranking.map(r => ({
    ...r,
    _id: String(r._id)
  }))
}
