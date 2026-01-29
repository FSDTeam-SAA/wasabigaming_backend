import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { PresentationTaskController } from './presentationtask.controller';
const router = express.Router();

router.post(
  '/create/:id',
  auth(userRole.student),
  PresentationTaskController.createPresentationTask,
);

router.get('/:id', PresentationTaskController.getSinglePresentationTask);

router.put(
  '/:id',
  auth(userRole.student),
  PresentationTaskController.updatePresentationTask,
);

export const presentationtaskRoutes = router;
