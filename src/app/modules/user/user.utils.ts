import { User } from './user.model'

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean()

  // eslint-disable-next-line no-undefined
  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined
}

export const generateAdminId = async () => {
  let currentId = (0).toString()
  const lastAdminId = await findLastAdminId()

  if (lastAdminId) {
    currentId = lastAdminId.substring(2)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(2, '0')

  incrementId = `TSA-${incrementId}`
  return incrementId
}

// Admin ID
export const findLastModeratorId = async () => {
  const lastModerator = await User.findOne(
    {
      role: 'moderator',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean()

  // eslint-disable-next-line no-undefined
  return lastModerator?.id ? lastModerator.id.substring(2) : undefined
}

export const generateModeratorId = async () => {
  let currentId = (0).toString()
  const lastModeratorId = await findLastModeratorId()

  if (lastModeratorId) {
    currentId = lastModeratorId.substring(2)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(2, '0')

  incrementId = `TSM-${incrementId}`
  return incrementId
}
