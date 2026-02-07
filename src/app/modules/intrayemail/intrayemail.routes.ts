import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { intrayemailController } from './intrayemail.controller';
import { checkStudentSubscription } from '../../middlewares/checkSubscription';
const router = express.Router();

router.post(
  '/create/:id',
  auth(userRole.student),
  checkStudentSubscription,
  intrayemailController.createintrayemail,
);

router.get(
  '/:id',
  intrayemailController.getSingleIntrayemail,
);

router.put(
  '/:id',
  auth(userRole.student),
  intrayemailController.updateIntrayemail,
);

export const intrayemailRouter = router;
