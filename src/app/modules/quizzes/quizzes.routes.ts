import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { quizzesController } from './quizzes.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin, userRole.school),
  fileUploader.upload.single('questions'),
  quizzesController.createQuizzes,
);
router.get('/', quizzesController.getAllquizzes);
router.get('/:id', quizzesController.getSingleQuizzes);
router.put(
  '/:id',
  auth(userRole.admin, userRole.school),
  fileUploader.upload.single('questions'),
  quizzesController.uploadQuizzes,
);
router.delete(
  '/:id',
  auth(userRole.admin, userRole.school),
  quizzesController.deleteQuizzes,
);

export const quizzesRouter = router;
