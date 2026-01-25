import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { appliedJobController } from './appliedJob.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.post(
  '/',
  auth(userRole.student),
  fileUploader.upload.single('cv'),
  appliedJobController.createAppliedJob,
);

export const appliedJobRoutes = router;
