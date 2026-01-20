import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { jobController } from './job.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin),
  fileUploader.upload.none(),
  jobController.createJob,
);
router.post('/', auth(userRole.admin), jobController.createManualJob);
router.get('/', jobController.getAllJobs);
router.put('/approved/:id', auth(userRole.admin), jobController.approvedJob);
router.get('/:id', jobController.singleJob);
router.put('/:id', auth(userRole.admin), jobController.updateJob);
router.delete('/:id', auth(userRole.admin), jobController.deleteJob);

export const jobRouter = router;
