import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserControllers } from './user.controller'
import { AdminValidation } from '../admin/admin.validation'
import { ModeratorValidation } from '../moderator/moderator.validation'

const router = express.Router()

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminValidationSchema),
  UserControllers.createAdmin,
)

router.post(
  '/create-moderator',
  validateRequest(ModeratorValidation.createModeratorValidationSchema),
  UserControllers.createModerator,
)

router.get('/', UserControllers.getAllUsers)
router.get('/:id', UserControllers.getSingleUsers)

export const UserRoutes = router
