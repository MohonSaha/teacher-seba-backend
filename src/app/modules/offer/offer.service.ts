// import mongoose from 'mongoose'
import { IOffer } from './offer.interface'
import { JwtPayload } from 'jsonwebtoken'
import { Offer } from './offer.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { OfferSearchableFields } from './offer.constant'
import AppError from '../../error/appError'
import httpStatus from 'http-status'
import { Teacher } from '../teacher/teacher.model'

/*
 ** create offer
 ** get all offers
 ** Get single offer
 ** Update a offer
 ** Cahnege admin status data
 ** Cahnege posted status data
 */

// create offer
const createCourseIntoDB = async (payload: IOffer, user: JwtPayload) => {
  const { recommendedTeacher } = payload

  // if the offer posted by admin it will automatically approved
  payload.postedBy = user?.userId
  if (user?.role === 'admin') {
    payload.postedStatus = 'approved'
  }

  // check if the recommended teacher id is valid or not
  const recommendedTeacherExist = await Teacher.findOne({
    _id: recommendedTeacher,
  })
  if (!recommendedTeacherExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Wrong recommended teacher id!')
  }

  const result = await Offer.create(payload)
  return result
}

// get all offers
const getAllOffersFromDB = async (query: Record<string, unknown>) => {
  const offerQuery = new QueryBuilder(Offer.find(), query)
    .search(OfferSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await offerQuery.modelQuery
  const meta = await offerQuery.countTotal()

  return {
    meta,
    result,
  }
}

// get single offer
const getSingleOfferFromDB = async (_id: string) => {
  const result = await Offer.findOne({ _id })
  return result
}

// update offer
const updateOfferIntoDB = async (id: string, payload: Partial<IOffer>) => {
  const { recommendedTeacher, ...restOfferData } = payload
  const modifiedUpdatedData: Record<string, unknown> = {
    ...restOfferData,
  }

  // check if the recommended teacher id is valid or not
  const recommendedTeacherExist = await Teacher.findOne({
    _id: recommendedTeacher,
  })
  if (!recommendedTeacherExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Wrong recommended teacher id!')
  }

  try {
    // update primitive and non-primitive data
    const updateOfferData = await Offer.findByIdAndUpdate(
      id,
      modifiedUpdatedData,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!updateOfferData) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update offer!')
    }

    const result = await Offer.findById(id)
    return result
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update offer!')
  }
}

// cahnege admin status data
const chnageAdminStatus = async (
  id: string,
  payload: { adminStatus: string },
) => {
  const result = await Offer.findByIdAndUpdate(id, payload, { new: true })
  return result
}

// cahnege admin status data
const chnagePostedStatus = async (
  id: string,
  payload: { adminStatus: string },
) => {
  const result = await Offer.findByIdAndUpdate(id, payload, { new: true })
  return result
}

export const OfferServices = {
  createCourseIntoDB,
  chnageAdminStatus,
  chnagePostedStatus,
  getAllOffersFromDB,
  getSingleOfferFromDB,
  updateOfferIntoDB,
  //   getCourseWithReviewFromDB,
  //   getTheBestCourseFromDB,
  //   updateCourseIntoDB,
}
