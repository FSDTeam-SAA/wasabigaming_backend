import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { premiumController } from './premium.controller';
const router = express.Router();

router.post('/', auth(userRole.admin), premiumController.createPremium);
router.get('/', premiumController.getAllPremium);
router.put(
  '/active/:id',
  auth(userRole.admin),
  premiumController.activePremium,
);
router.get('/:id', premiumController.getSinglePremium);
router.put('/:id', auth(userRole.admin), premiumController.updatePremium);
router.delete('/:id', auth(userRole.admin), premiumController.deletePremium);
router.post(
  '/pay/:id',
  auth(userRole.student, userRole.school),
  premiumController.paySubscription,
);
export const premiumRouter = router;
