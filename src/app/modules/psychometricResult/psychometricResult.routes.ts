import express from 'express';
import auth from '../../middlewares/auth';
import { userRole } from '../user/user.constant';
import { psychometricResultController } from './psychometricResult.controller';
const router = express.Router();

export const psychometricResultRouter = router;
