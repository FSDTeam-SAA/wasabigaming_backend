import express from 'express';
import { userRole } from '../user/user.constant';
import { courseQuizAttemptController } from './courseQuizAttempt.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/courses/:courseId/videos/:videoId/quizzes/submit',
  auth(userRole.student),
  courseQuizAttemptController.submitCourseQuiz,
);

export const courseQuizAttemptRouter = router;
