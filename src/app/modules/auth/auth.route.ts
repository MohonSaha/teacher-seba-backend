import express from 'express'
import { AuthValidation } from './auth.validation'
import validateRequest from '../../middlewares/validateRequest'
import { AuthControllers } from './auth.controller'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
)

// router.post(
//   '/change-password',
//   auth(USER_ROLE.admin, USER_ROLE.user),
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   AuthController.changePassword,
// )

export const AuthRoutes = router
