import express from 'express';
import { reviewController } from './review.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin, userRole.student),
  reviewController.createReview,
);
router.get('/', reviewController.getAllReview);
router.get('/:id', reviewController.getSingleReview);
router.put(
  '/:id',
  auth(userRole.admin, userRole.student),
  reviewController.updateReview,
);
router.delete(
  '/:id',
  auth(userRole.admin, userRole.student),
  reviewController.deleteReview,
);

export const reviewRoutes = router;
