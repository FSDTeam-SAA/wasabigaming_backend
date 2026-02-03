import { Router } from 'express';
import { inviteStudentController } from './invite_students.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { fileUploader } from '../../helper/fileUploder';

const router = Router();

router.post(
  '/',
  auth(userRole.school),
  fileUploader.upload.single('url'),
  inviteStudentController.sendInvite,
);

router.get(
  '/',
  auth(userRole.admin, userRole.school),
  inviteStudentController.getAllInviteStudents,
);
router.put(
  '/status',
  auth(userRole.admin, userRole.school),
  inviteStudentController.updateInviteStudentStatus,
);
router.put(
  '/:id',
  auth(userRole.admin, userRole.school),
  inviteStudentController.updateInviteStudent,
);
router.get(
  '/:id',
  auth(userRole.admin, userRole.school),
  inviteStudentController.getInviteStudentById,
);
router.delete(
  '/:id',
  auth(userRole.admin, userRole.school),
  inviteStudentController.deleteInviteStudent,
);

export const inviteStudentRouter = router;
