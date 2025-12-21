import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { psychometricResultController } from './psychometricResult.controller';
const router = express.Router();

router.get(
  '/',
  auth(userRole.admin, userRole.school, userRole.student),
  psychometricResultController.getMyAllPsychometricResults,
);
router.get(
  '/:id',
  auth(userRole.admin, userRole.school, userRole.student),
  psychometricResultController.singlePsychometricResult,
);
router.delete(
  '/:id',
  auth(userRole.admin, userRole.school, userRole.student),
  psychometricResultController.deletePsychometricResult,
);

export const psychometricResultRouter = router;
