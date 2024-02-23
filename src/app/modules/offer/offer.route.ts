import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OfferValidation } from './offer.validation'
import { OfferControllers } from './offer.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/create-offer',
  auth(USER_ROLE.admin),
  validateRequest(OfferValidation.createOfferValidationSchema),
  OfferControllers.createOffer,
)

// router.get('/courses', courseControllers.getAllCourses)
// router.get('/courses/:id/reviews', courseControllers.getCourseWithReview)
// router.get('/course/best', courseControllers.getTheBestCourse)

// router.put(
//   '/courses/:id',
//   auth(USER_ROLE.admin),
//   validateRequest(CourseValidations.updateCourseValidationSchema),
//   courseControllers.updateCourse,
// )

router.post(
  '/change-admin-status/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(OfferValidation.changeAdminStatusValidationSchema),
  OfferControllers.chnageAdminStatus,
)

router.post(
  '/change-posted-status/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(OfferValidation.changePostedStatusValidationSchema),
  OfferControllers.chnagePostedStatus,
)

export const OfferRoutes = router
