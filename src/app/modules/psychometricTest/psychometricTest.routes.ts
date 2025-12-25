import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { psychometricTestController } from './psychometricTest.controller';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin, userRole.student, userRole.school),
  psychometricTestController.createPsychometricTest,
);

router.get(
  '/',
  auth(userRole.admin, userRole.student, userRole.school),
  psychometricTestController.getMyAllPsychometricTests,
);

router.get(
  '/:id',
  // auth(userRole.admin, userRole.student, userRole.school),
  psychometricTestController.singlePsychometricTest,
);

router.delete(
  '/:id',
  auth(userRole.admin, userRole.student, userRole.school),
  psychometricTestController.deletePsychometricTest,
);

export const psychometricTestRouter = router;
