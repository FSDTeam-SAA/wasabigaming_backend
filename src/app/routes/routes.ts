import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { dashboardRouter } from '../modules/dashboard/dashboard.routes';
import { courseRouter } from '../modules/course/course.routes';
import { quizzesRouter } from '../modules/quizzes/quizzes.routes';

import { contactRouter } from '../modules/contact/contact.routes';

import { taskRouter } from '../modules/task/task.routes';
import { lawfirmsRouter } from '../modules/lawfirm/lawfirm.routes';
import { inviteStudentRouter } from '../modules/invite_students/invite_students.routes';
import { applicationTrackerRouter } from '../modules/applicationTracker/applicationTracker.routes';
import { websiteRouter } from '../modules/website/website.routes';

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
    path: '/contacts',
    route: contactRouter,
  },
  {
    path: '/task',
    route: taskRouter,
  },
  {
    path: '/lawfirm',
    route: lawfirmsRouter,
  },
  {
    path: '/invite-students',
    route: inviteStudentRouter,
  },
  {
    path: '/application-tracker',
    route: applicationTrackerRouter,
  },
  {
    path: '/website',
    route: websiteRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
