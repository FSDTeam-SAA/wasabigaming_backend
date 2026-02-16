// community.route.ts
import { Router } from 'express';
import { communityController } from './joinCommunity.controller';

const router = Router();

router.post(
  '/',
  communityController.createCommunity
);

router.get('/', communityController.getAllCommunity);

router.get('/:id', communityController.getSingleCommunity);

router.patch(
  '/:id',
  communityController.updateCommunity
);

router.delete('/:id', communityController.deleteCommunity);

export const communityRoutes = router;