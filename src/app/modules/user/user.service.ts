import mongoose from 'mongoose'
// import config from '../../config'
import { IAdmin } from '../admin/admin.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateAdminId, generateModeratorId } from './user.utils'
import httpStatus from 'http-status'
import { Admin } from '../admin/admin.model'
import AppError from '../../error/appError'
import { IModerator } from '../moderator/moderator.interface'
import { Moderator } from '../moderator/moderator.model'

const createAdminIntoDB = async (payload: IAdmin) => {
  // create a user object
  const userData: Partial<IUser> = {}

  //if password is not given , use deafult password
  userData.password = payload.password

  //set admin role
  userData.role = 'admin'
  // set admin email
  userData.email = payload.email
  // set admin mobile
  userData.mobile = payload.mobile

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateAdminId()

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

// create moderator
const createModeratorIntoDB = async (payload: IModerator) => {
  // create a user object
  const userData: Partial<IUser> = {}

  //set the password in db
  userData.password = payload.password

  //set moderator role
  userData.role = 'moderator'
  // set moderator email
  userData.email = payload.email
  // set moderator mobile
  userData.mobile = payload.mobile

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateModeratorId()

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create moderator')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a admin (transaction-2)
    const newModerator = await Moderator.create([payload], { session })

    if (!newModerator.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newModerator
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const getAllUsersFromDB = async () => {
  const result = await User.find()
  return result
}

const getSingleUsersFromDB = async (_id: string) => {
  const result = await User.find({ _id })
  return result
}

export const UserService = {
  createAdminIntoDB,
  createModeratorIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
}
