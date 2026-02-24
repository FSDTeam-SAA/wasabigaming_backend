import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { cvController } from './cv.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.get('/', auth(userRole.admin), cvController.getAllCv);
router.post(
  '/apply/:jobId',
  auth(userRole.student),
  fileUploader.upload.single('cvUrl'),
  cvController.applyJob,
);
router.get('/:id', auth(userRole.admin), cvController.getSingleCv);

export const cvRoutes = router;
