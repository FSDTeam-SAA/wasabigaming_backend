import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { courseController } from './course.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

// router.post(
//   '/',
//   auth(userRole.admin, userRole.school),
//   fileUploader.upload.array('courseVideo'),
//   courseController.createCourse,
// );
router.post(
  '/',
  auth(userRole.admin, userRole.school),
  fileUploader.upload.fields([
    { name: 'courseVideo', maxCount: 20 }, 
    { name: 'thumbnail', maxCount: 1 },   
  ]),
  courseController.createCourse,
);

router.get('/', courseController.getAllCourse);
router.post(
  '/enroll/:id',
  auth(userRole.student, userRole.school),
  courseController.payCourse,
);
router.get(
  '/enroll/:id',
  auth(userRole.student, userRole.school),
  courseController.couseEnroleuser,
);
router.get('/:id', courseController.getSingleCourse);

router.put(
  '/:id/video',
  auth(userRole.admin, userRole.school),
  fileUploader.upload.array('courseVideo'),
  courseController.addVideo,
);

router.delete(
  '/:courseId/video/:videoId',
  auth(userRole.admin, userRole.school),
  courseController.removeVideo,
);

router.put(
  '/:id',
  auth(userRole.admin, userRole.school),
  fileUploader.upload.array('courseVideo'),
  courseController.uploadCourse,
);

router.delete(
  '/:id',
  auth(userRole.admin, userRole.school),
  courseController.deleteCourse,
);

export const courseRouter = router;
