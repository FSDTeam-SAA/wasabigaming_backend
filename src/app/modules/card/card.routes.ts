import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { fileUploader } from '../../helper/fileUploder';
import { cardController } from './card.controller';
const router = express.Router();

router.post(
  '/',
  auth(userRole.admin),
  fileUploader.upload.single('image'),
  cardController.createCard,
);

router.get('/', cardController.getAllCard);

router.get('/:id', cardController.getSingleCard);
router.put(
  '/:id',
  auth(userRole.admin),
  fileUploader.upload.single('image'),
  cardController.updateCard,
);
router.delete('/:id', auth(userRole.admin), cardController.deleteCard);

export const cardRouter = router;
