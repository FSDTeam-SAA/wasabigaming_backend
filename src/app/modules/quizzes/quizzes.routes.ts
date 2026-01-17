import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { quizzesController } from './quizzes.controller';
const router = express.Router();

router.post('/', auth(userRole.admin), quizzesController.createQuizzes);
router.get('/', quizzesController.getAllquizzes);
router.get('/:id', quizzesController.getSingleQuizzes);
router.put('/:id', auth(userRole.admin), quizzesController.updateQuizzes);
router.delete('/:id', auth(userRole.admin), quizzesController.deleteQuizzes);

export const quizzesRouter = router;
