import express from 'express';
import { courseProgressController } from './videoProgress.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

router.post(
  '/course/:courseId/video/:videoId/complete',
  auth(userRole.student),
  courseProgressController.markCompleted,
);

export const videoProgressRoutes = router;
