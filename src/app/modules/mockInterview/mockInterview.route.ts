import express from 'express';
import { mockInterviewController } from './mockInterview.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(userRole.admin, userRole.student),
  mockInterviewController.createMockInterview
);

router.get(
  '/',
  auth(userRole.admin, userRole.student),
  mockInterviewController.getAllMockInterviews
);

router.get(
  '/:id',
  auth(userRole.admin, userRole.student),
  mockInterviewController.getMockInterviewById
);

router.delete(
  '/:id',
  auth(userRole.admin, userRole.student),
  mockInterviewController.deleteMockInterviewById
);
router.put(
  '/:id',
  auth(userRole.admin, userRole.student),
  mockInterviewController.updateMockInterview
);

export const mockInterviewRouter = router;
