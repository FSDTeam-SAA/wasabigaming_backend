import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { psychometricController } from './psychometric.controller';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin),
  psychometricController.createPsychometric,
);

router.get('/', psychometricController.getAllPsychometric);
router.get('/:id', psychometricController.getPsychometricById);
router.put(
  '/:id',
  auth(userRole.admin),
  psychometricController.updatePsychometric,
);
router.delete(
  '/:id',
  auth(userRole.admin),
  psychometricController.deletePsychometric,
);

export const psychometricRouter = router;
