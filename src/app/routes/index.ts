import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
];

// router.use('/', CourseRoutes)  => Aboid this code repeatation and use loop
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
