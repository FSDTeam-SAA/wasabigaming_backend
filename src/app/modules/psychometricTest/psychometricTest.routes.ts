import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { psychometricTestController } from './psychometricTest.controller';
import { check } from 'zod';
import { checkStudentSubscription } from '../../middlewares/checkSubscription';
const router = express.Router();

// router.post(
//   '/',
//   auth(userRole.admin, userRole.student, userRole.school),
//   psychometricTestController.createPsychometricTest,
// );

// router.get(
//   '/',
//   auth(userRole.admin, userRole.student, userRole.school),
//   psychometricTestController.getMyAllPsychometricTests,
// );

// router.get(
//   '/:id',
//   // auth(userRole.admin, userRole.student, userRole.school),
//   psychometricTestController.singlePsychometricTest,
// );

// router.delete(
//   '/:id',
//   auth(userRole.admin, userRole.student, userRole.school),
//   psychometricTestController.deletePsychometricTest,
// );

//=================================update psychometricTestRouter ==============================
router.post(
  '/',
  auth(userRole.admin),
  psychometricTestController.createPsychometricTest,
);

router.get('/', psychometricTestController.getMyAllPsychometricTests);
router.put(
  '/add/:id',
  auth(userRole.admin),
  psychometricTestController.addQusestion,
);
router.delete(
  '/:id/remove/:questionId',
  auth(userRole.admin),
  psychometricTestController.removedSingleQuestion,
);

router.get('/:id', 
  auth(userRole.student, userRole.admin),
  checkStudentSubscription,
  psychometricTestController.singlePsychometricTest);

router.put(
  '/:id',
  auth(userRole.admin),
  psychometricTestController.updatePsychometricTests,
);

router.delete(
  '/:id',
  auth(userRole.admin),
  psychometricTestController.deletePsychometricTest,
);

export const psychometricTestRouter = router;
