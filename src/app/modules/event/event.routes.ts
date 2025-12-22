import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { eventController } from './event.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin),
  fileUploader.upload.single('thamble'),
  eventController.createEvent,
);

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put(
  '/:id',
  auth(userRole.admin),
  fileUploader.upload.single('thamble'),
  eventController.updateEvent,
);
router.delete('/:id', auth(userRole.admin), eventController.deleteEvent);

export const eventRouter = router;
