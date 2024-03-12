import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { OfferServices } from './offer.service'

/*
 ** create offer
 ** get all offers
 ** Get single offer
 ** Update a offer
 ** Cahnege admin status data
 ** Cahnege posted status data
 */

// create a offer
const createOffer = catchAsync(async (req, res) => {
  const result = await OfferServices.createCourseIntoDB(req.body, req.user)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    data: result,
  })
})

// get all offer
const getAllOffers = catchAsync(async (req, res) => {
  const result = await OfferServices.getAllOffersFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tuition offers are retrieved successfully',
    meta: result.meta,
    data: result.result,
  })
})

// get single offer
const getSingleOffer = catchAsync(async (req, res) => {
  const offerId = req.params.offerId
  const result = await OfferServices.getSingleOfferFromDB(offerId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tuition offer retrieved successfully',
    data: result,
  })
})

// update offer
const updateOffer = catchAsync(async (req, res) => {
  const { offerId } = req.params
  const result = await OfferServices.updateOfferIntoDB(offerId, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offer is updated succesfully',
    data: result,
  })
})

// change admin status
const chnageAdminStatus = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await OfferServices.chnageAdminStatus(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin status is updated succesfully',
    data: result,
  })
})

// change admin status
const chnagePostedStatus = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await OfferServices.chnagePostedStatus(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin status is updated succesfully',
    data: result,
  })
})

export const OfferControllers = {
  createOffer,
  getAllOffers,
  getSingleOffer,
  chnageAdminStatus,
  chnagePostedStatus,
  updateOffer,
}
