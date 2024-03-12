import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OfferValidation } from './offer.validation'
import { OfferControllers } from './offer.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

/*
 ** create offer
 ** get all offers
 ** Get single offer
 ** Update a offer
 ** Cahnege admin status data
 ** Cahnege posted status data
 */

router.post(
  '/create-offer',
  auth(USER_ROLE.admin),
  validateRequest(OfferValidation.createOfferValidationSchema),
  OfferControllers.createOffer,
)

router.get('/', OfferControllers.getAllOffers)

router.get('/:offerId', OfferControllers.getSingleOffer)

router.put(
  '/update-offer/:offerId',
  // auth(USER_ROLE.admin),
  validateRequest(OfferValidation.updateOfferValidationSchema),
  OfferControllers.updateOffer,
)

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
