import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { applicationTrackerController } from './applicationTracker.controller';
const router = express.Router();

router.get(
  '/overview',
  auth(userRole.admin),
  applicationTrackerController.applicationTrackerOverview,
);

router.post(
  '/',
  auth(userRole.admin),
  applicationTrackerController.createApplication,
);

export const applicationTrackerRouter = router;
