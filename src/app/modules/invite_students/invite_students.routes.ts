// ==================== contact.routes.ts ====================
import { Router } from 'express';
import { inviteStudentController } from './invite_students.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';

const router = Router();

router.post( '/', inviteStudentController. sendInvite, );
router.get('/',  auth(userRole.admin), inviteStudentController.getAllInviteStudents);
router.put('/:contactId', auth(userRole.admin), inviteStudentController.updateInviteStudent);
router.get('/:contactId', auth(userRole.admin), inviteStudentController.getInviteStudentById,);
router.delete('/:contactId', auth(userRole.admin), inviteStudentController.deleteInviteStudent);

export const inviteStudentRouter =  router;