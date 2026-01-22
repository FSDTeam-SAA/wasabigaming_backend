import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { websiteController } from './website.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin),
  fileUploader.upload.array('thumbnail'),
  websiteController.createWebsite,
);
router.get('/', websiteController.getAllWebsite);
router.get(
  '/:id',
  //   auth(userRole.admin, userRole.school, userRole.student),
  websiteController.getWebsiteById,
);
// router.get(
//   '/key/:key',
//   // auth(userRole.admin, userRole.school, userRole.student),
//   websiteController.getWebsiteByKey,
// );
router.put(
  '/:id',
  auth(userRole.admin),
  fileUploader.upload.array('thumbnail'),
  websiteController.updateWebsite,
);
router.delete('/:id', auth(userRole.admin), websiteController.deleteWebsite);

export const websiteRouter = router;
