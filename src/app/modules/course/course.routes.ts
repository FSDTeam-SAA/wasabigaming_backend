import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { courseController } from './course.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin, userRole.school),
  fileUploader.upload.single('courseVideo'),
  courseController.createCourse,
);

router.get('/', courseController.getAllCourse);
router.get('/:id', courseController.getSingleCourse);
router.put(
  '/:id',
  auth(userRole.admin, userRole.school),
  fileUploader.upload.single('courseVideo'),
  courseController.uploadCourse,
);
router.delete(
  '/:id',
  auth(userRole.admin, userRole.school),
  courseController.deleteCourse,
);

export const courseRouter = router;
