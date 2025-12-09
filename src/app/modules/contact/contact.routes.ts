// ==================== contact.routes.ts ====================
import { Router } from 'express';
import { contactController } from './contact.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';

const router = Router();

router.post( '/', contactController.createContact );
router.get('/',  auth(userRole.admin), contactController.getAllContacts);
router.get('/:contactId', auth(userRole.admin), contactController.getContactById);
router.delete('/:contactId', auth(userRole.admin), contactController.deleteContact);

export const contactRouter =  router;