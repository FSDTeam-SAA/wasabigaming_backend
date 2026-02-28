import express from 'express';
import { certificateController } from './certificate.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

router.get(
  '/course/:id/download',
  auth(userRole.student),
  certificateController.downloadCertificate,
);

export const certificateRoutes = router;
