import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { bookmarkController } from './lawbookmark.controller';
const router = express.Router();

router.post('/', auth(userRole.student), bookmarkController.addBookmark);
router.get('/', auth(userRole.student), bookmarkController.getAllBookmarks);
router.get(
  '/:lawfirmId',
  auth(userRole.student),
  bookmarkController.getSingleUserBookmark,
);

router.delete(
  '/:lawfirmId',
  auth(userRole.student),
  bookmarkController.removeBookmark,
);

export const lawBookmarkRoutes = router;
