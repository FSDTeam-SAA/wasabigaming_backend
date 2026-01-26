import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { mockInterviewSessionController } from './mockInterviewSession.controller';

const router = express.Router();

router.post(
  '/',
  auth(userRole.admin, userRole.student),
  mockInterviewSessionController.createMockInterviewSession
);
router.get(
  '/',
  auth(userRole.admin, userRole.student),
  mockInterviewSessionController.getAllMockInterviewSessions
);
router.get(
  '/:id',
  auth(userRole.admin, userRole.student),
  mockInterviewSessionController.getMockInterviewSessionById
);
router.put(
  '/:id',
  auth(userRole.admin, userRole.student),
  mockInterviewSessionController.updateMockInterviewSession
);
router.delete(
  '/:id',
  auth(userRole.admin, userRole.student),
  mockInterviewSessionController.deleteMockInterviewSessionById
);


export const mockInterviewSessionRouter = router;
