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

router.get('/', applicationTrackerController.getAllApplication);
router.get('/:id', applicationTrackerController.getSingleApplication);
router.put(
  '/:id',
  auth(userRole.admin, userRole.student),
  applicationTrackerController.updateApplication,
);
router.delete(
  '/:id',
  auth(userRole.admin, userRole.student),
  applicationTrackerController.deleteApplication,
);

export const applicationTrackerRouter = router;
