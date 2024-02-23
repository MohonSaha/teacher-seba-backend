import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { OfferServices } from './offer.service'

const createOffer = catchAsync(async (req, res) => {
  const result = await OfferServices.createCourseIntoDB(req.body, req.user)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
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
  chnageAdminStatus,
  chnagePostedStatus,
}
