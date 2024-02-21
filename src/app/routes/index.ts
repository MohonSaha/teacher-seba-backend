import { Router } from 'express'
import { CourseRoutes } from '../modules/course/course.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/user/user.route'
import { AdminRoutes } from '../modules/admin/admin.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/',
    route: CourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
]

// router.use('/', CourseRoutes)  => Aboid this code repeatation and use loop
moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
