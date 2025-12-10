import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { websiteController } from './website.controller';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin, userRole.school, userRole.student),
  websiteController.createWebsite,
);
router.get(
  '/',
  //   auth(userRole.admin, userRole.school, userRole.student),
  websiteController.getAllWebsite,
);
router.get(
  '/:id',
  //   auth(userRole.admin, userRole.school, userRole.student),
  websiteController.getWebsiteById,
);
router.get(
  '/key/:key',
  auth(userRole.admin, userRole.school, userRole.student),
  websiteController.getWebsiteByKey,
);
router.put(
  '/:id',
  auth(userRole.admin, userRole.school, userRole.student),
  websiteController.updateWebsite,
);
router.delete(
  '/:id',
  auth(userRole.admin, userRole.school, userRole.student),
  websiteController.removeWebsite,
);

export const websiteRouter = router;
