import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { dashboardRouter } from '../modules/dashboard/dashboard.routes';
import { courseRouter } from '../modules/course/course.routes';
import { quizzesRouter } from '../modules/quizzes/quizzes.routes';
import { taskRouter } from '../modules/task/task.routes';
import { lawfirmsRouter } from '../modules/lawfirm/lawfirm.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/dashboard',
    route: dashboardRouter,
  },
  {
    path: '/course',
    route: courseRouter,
  },
  {
    path: '/quizzes',
    route: quizzesRouter,
  },
  {
    path: '/task',
    route: taskRouter,
  },
  {
    path: '/lawfirm',
    route: lawfirmsRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
