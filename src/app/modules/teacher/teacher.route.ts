import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { updateTeacherValidationSchema } from './teacher.validation'
import { TeacherControllers } from './teacher.controller'

const router = express.Router()

// router.get('/', AdminControllers.getAllAdmins)

// router.get('/:id', AdminControllers.getSingleAdmin)

router.patch(
  '/:id',
  validateRequest(updateTeacherValidationSchema),
  TeacherControllers.updateTeacher,
)

// router.delete('/:id', AdminControllers.deleteAdmin)

export const TeacherRoutes = router
