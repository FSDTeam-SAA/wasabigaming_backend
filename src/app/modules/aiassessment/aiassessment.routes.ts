import express from 'express';
import { aiassessmentController } from './aiassessment.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.post(
  '/',
  fileUploader.upload.single('logo'),
  aiassessmentController.createAiassessment,
);
router.get('/', aiassessmentController.getAllAiassessments);
router.get('/:id', aiassessmentController.getSingleAiassessment);
router.put(
  '/:id',
  fileUploader.upload.single('logo'),
  aiassessmentController.updateAiassessment,
);
router.delete('/:id', aiassessmentController.deleteAiassessment);

export const aiassessmentRouter = router;
