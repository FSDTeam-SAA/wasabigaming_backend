import express from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';

import { userRole } from './user.constant';
import { fileUploader } from '../../helper/fileUploder';

const router = express.Router();

router.post('/create-student', auth(userRole.admin), userController.createUser);

router.get(
  '/profile',
  auth(userRole.admin, userRole.school, userRole.student),
  userController.profile,
);
router.put(
  '/profile',
  auth(userRole.admin, userRole.school, userRole.student),
  fileUploader.upload.single('profileImage'),
  userController.updateUserById,
);

router.get('/all-user', auth(userRole.admin), userController.getAllUser);
router.get('/:id', auth(userRole.admin), userController.getUserById);

router.delete('/:id', auth(userRole.admin), userController.deleteUserById);

export const userRoutes = router;
