// dynamicWebsite.route.ts
import { Router } from 'express';
import { dynamicWebsiteController } from './dynamicWebsite.controller';
import { fileUploader } from '../../helper/fileUploder';

const router = Router();

router.post(
  '/',
  fileUploader.upload.single('image'),
  dynamicWebsiteController.createDynamicWebsite
);

router.get('/', dynamicWebsiteController.getAllDynamicWebsite);

router.get('/:id', dynamicWebsiteController.getSingleDynamicWebsite);

router.patch(
  '/:id',
  dynamicWebsiteController.updateDynamicWebsite
);

router.delete('/:id', dynamicWebsiteController.deleteDynamicWebsite);

export const dynamicWebsiteRoutes = router;