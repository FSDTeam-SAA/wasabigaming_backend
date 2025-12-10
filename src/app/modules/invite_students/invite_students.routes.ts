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
  auth(userRole.admin),
  inviteStudentController.getAllInviteStudents,
);
router.put(
  '/:contactId',
  auth(userRole.admin),
  inviteStudentController.updateInviteStudent,
);
router.get(
  '/:contactId',
  auth(userRole.admin),
  inviteStudentController.getInviteStudentById,
);
router.delete(
  '/:contactId',
  auth(userRole.admin),
  inviteStudentController.deleteInviteStudent,
);

export const inviteStudentRouter = router;
