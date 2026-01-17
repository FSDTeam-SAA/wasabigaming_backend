import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { lawfirmController } from './lawfirm.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

const fileFields = fileUploader.upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]);

router.post(
  '/',
  auth(userRole.admin),
  fileFields,
  lawfirmController.createLawfirm,
);
router.get('/', lawfirmController.getAllLawfirm);

router.put(
  '/:id/approved',
  auth(userRole.admin),
  lawfirmController.approvedLawfirm,
);

router.get('/:id', lawfirmController.getSingleLawfirm);

router.put(
  '/:id',
  auth(userRole.admin),
  fileUploader.upload.single('logo'),
  lawfirmController.uploadLawfirm,
);

router.delete('/:id', auth(userRole.admin), lawfirmController.deleteLawfirm);

export const lawfirmsRouter = router;
