import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { ingestAiResult } from './psychometricAi.controller';

const router = express.Router();

// AI → Backend
router.post(
  '/ai-result',
  auth(userRole.admin, userRole.school),
  ingestAiResult,
);

export const psychometricAiRouter = router;
