import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { cvbuilderController } from './cvbuilder.controller';
import { checkStudentSubscription } from '../../middlewares/checkSubscription';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin, userRole.student),
  cvbuilderController.createCVbuilder,
);

router.get(
  '/',
  auth(userRole.admin, userRole.student),
  cvbuilderController.getAllCVbuilder,
);
router.post(
  '/leadership',
  auth(userRole.admin, userRole.student),
  cvbuilderController.leaderShip,
);

router.get('/:id', cvbuilderController.getSingleCVbuilder);

router.put(
  '/:id',
  auth(userRole.admin, userRole.student),
  cvbuilderController.updateCVbuilder,
);

router.delete(
  '/:id',
  auth(userRole.admin, userRole.student),
  cvbuilderController.deleteCVbuilder,
);

export const cvBuilderRouter = router;
