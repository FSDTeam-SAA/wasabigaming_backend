import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { cvbuilderController } from './cvbuilder.controller';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin, userRole.student),
  cvbuilderController.createCVbuilder,
);

router.get(
  '/',
  auth(userRole.admin, userRole.student),
  cvbuilderController.getAllCVbuilder,
);

router.get(
  '/:id',
  auth(userRole.admin, userRole.student),
  cvbuilderController.getSingleCVbuilder,
);

router.put(
  '/:id',
  auth(userRole.admin, userRole.student),
  cvbuilderController.updateCVbuilder,
);

router.delete(
  '/:id',
  auth(userRole.admin, userRole.student),
  cvbuilderController.deleteCVbuilder,
);

export const cvBuilderRouter = router;
