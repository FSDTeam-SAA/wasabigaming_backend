import express from 'express';
import auth from '../../middlewares/auth';
import { teamController } from './team.controller';
import { userRole } from '../user/user.constant';
import { fileUploader } from '../../helper/fileUploder';

const router = express.Router();

router.post(
  '/',
//   auth(userRole.admin),
  fileUploader.upload.array('image'),
  teamController.createTeam
);
router.get('/', teamController.getAllteams);
router.delete('/:id', teamController.deleteTeam);
router.put('/:id', teamController.updateTeam);


export const teamRoutes = router;
