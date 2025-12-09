import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { lawfirmController } from './lawfirm.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin),
  fileUploader.upload.single('logo'),
  lawfirmController.createLawfirm,
);
router.get('/', lawfirmController.getAllLawfirm);
router.get('/:id', lawfirmController.getSingleLawfirm);
router.put(
  '/:id',
  auth(userRole.admin),
  fileUploader.upload.single('logo'),
  lawfirmController.uploadLawfirm,
);
router.delete('/:id', auth(userRole.admin), lawfirmController.deleteLawfirm);

export const lawfirmsRouter = router;
