import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { jobBookmarkController } from './jobBookMark.controller';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin, userRole.student),
  jobBookmarkController.addJobBookmark
);

router.delete(
  '/:id',
  auth(userRole.admin, userRole.student),
  jobBookmarkController.removeJobBookmark
);

router.get(
  '/',
  auth(userRole.admin, userRole.student),
  jobBookmarkController.getAllBookmarks
);


export const bookMarkRouter = router;
