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

export const OfferControllers = {
  createOffer,
}
