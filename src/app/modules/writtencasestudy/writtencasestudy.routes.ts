import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { writtencasestudyController } from './writtencasestudy.controller';
import { checkStudentSubscription } from '../../middlewares/checkSubscription';
const router = express.Router();

router.post(
  '/creat/:id',
  auth(userRole.student),
  checkStudentSubscription,
  writtencasestudyController.createWrittenCaseStudy,
);
router.get('/:id', writtencasestudyController.getSingleAiassessment);
router.put(
  '/:id',
  auth(userRole.student),
  writtencasestudyController.updateWrittenCaseStudy,
);

export const writtencasestudyRoutes = router;
