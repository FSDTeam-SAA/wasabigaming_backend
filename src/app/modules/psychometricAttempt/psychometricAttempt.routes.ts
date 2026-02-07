import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { psychometricAttemptController } from './psychometricAttempt.controller';
import { checkStudentSubscription } from '../../middlewares/checkSubscription';
// import { psychometricController } from './psychometricAttempt.controller';
const router = express.Router();

// router.post(
//   '/',
//   auth(userRole.admin),
//   psychometricController.createPsychometric,
// );

// router.get('/', psychometricController.getAllPsychometric);
// router.get('/:id', psychometricController.getPsychometricById);
// router.put(
//   '/:id',
//   auth(userRole.admin),
//   psychometricController.updatePsychometric,
// );
// router.delete(
//   '/:id',
//   auth(userRole.admin),
//   psychometricController.deletePsychometric,
// );

//============================= update =================================
router.post(
  '/:id/submit',
  auth(userRole.student),
  checkStudentSubscription,
  psychometricAttemptController.submitPsychometricTest,
);

router.post(
  '/:id/try-again',
  auth(userRole.student),
  checkStudentSubscription,
  psychometricAttemptController.tryAgainPsychometricAttempt,
);

router.get(
  '/my-answers',
  auth(userRole.student),
  psychometricAttemptController.getMyPsychometricAnswers,
);

router.get(
  '/my-score',
  auth(userRole.student),
  psychometricAttemptController.myOverallScore,
);

router.get(
  '/:id',
  // auth(userRole.student),
  psychometricAttemptController.getSinglePsychometricAttempt,
);

export const psychometricAttemptRouter = router;
