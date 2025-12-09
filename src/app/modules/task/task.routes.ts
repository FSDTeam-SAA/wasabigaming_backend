import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { taskController } from './task.controller';
const router = express.Router();

router.post('/', auth(userRole.admin), taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getSingleTask);
router.put('/:id', auth(userRole.admin), taskController.updateTask);
router.delete('/:id', auth(userRole.admin), taskController.deleteTask);

export const taskRouter = router;
