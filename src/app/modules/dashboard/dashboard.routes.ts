import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { dashboardController } from './dashboard.controller';
const router = express.Router();

router.get(
  '/admin-overview',
  auth(userRole.admin),
  dashboardController.adminOverview,
);

export const dashboardRouter = router;
