import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../error/appError'
import { AdminSearchableFields } from './admin.constant'
import { Admin } from './admin.model'
import mongoose from 'mongoose'
import { User } from '../user/user.model'
import { IAdmin } from './admin.interface'

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await adminQuery.modelQuery
  return result
}

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id)
  return result
}

// delete admin using transaction & rollback
const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  const admin = await Admin.findById(id)
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found')
  }

  try {
    session.startTransaction()

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin')
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedAdmin
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

// update admin
const updateAdminIntoDB = async (id: string, payload: Partial<IAdmin>) => {
  const { name, ...restAdminData } = payload
  const modifiedUpdatedData: Record<string, unknown> = {
    ...restAdminData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  try {
    // update primitive and non-primitive data
    const updateCOurseData = await Admin.findByIdAndUpdate(
      id,
      modifiedUpdatedData,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!updateCOurseData) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course !!')
    }

    const result = await Admin.findById(id)
    return result
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!!')
  }
}

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  deleteAdminFromDB,
  updateAdminIntoDB,
}
