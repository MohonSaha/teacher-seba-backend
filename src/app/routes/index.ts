import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/user/user.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { TeacherRoutes } from '../modules/teacher/teacher.route'
import { OfferRoutes } from '../modules/offer/offer.route'

const router = Router()

const moduleRoutes = [
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
  // {
  //   path: '/moderator',
  //   route: Modera,
  // },
  {
    path: '/teachers',
    route: TeacherRoutes,
  },
  {
    path: '/tuition-offers',
    route: OfferRoutes,
  },
]

// router.use('/', CourseRoutes)  => Aboid this code repeatation and use loop
moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
