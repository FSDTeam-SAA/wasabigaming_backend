import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { writtencasestudyController } from './writtencasestudy.controller';
const router = express.Router();

router.post(
  '/creat/:id',
  auth(userRole.student),
  writtencasestudyController.createWrittenCaseStudy,
);
router.get('/:id', writtencasestudyController.getSingleAiassessment);
router.put(
  '/:id',
  auth(userRole.student),
  writtencasestudyController.updateWrittenCaseStudy,
);

export const writtencasestudyRoutes = router;
