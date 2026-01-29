import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { careanalysislController } from './careanalysis.controller';
const router = express.Router();

router.post(
  '/create/:id',
  auth(userRole.student),
  careanalysislController.createCareanalysisl,
);
router.get('/:id', careanalysislController.getSingleCareanalysisl);
router.put(
  '/:id',
  auth(userRole.student),
  careanalysislController.updateCareanalysisl,
);

export const careanalysisRouter = router;
