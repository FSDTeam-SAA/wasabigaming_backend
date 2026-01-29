import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { intrayemailController } from './intrayemail.controller';
const router = express.Router();

router.post(
  '/create/:id',
  auth(userRole.student),
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
