import express from "express";
import { coverLetterController } from "./coverLetter.controller";
import auth from "../../middlewares/auth";
import { userRole } from "../user/user.constant";
import { fileUploader } from "../../helper/fileUploder";
import { checkStudentSubscription } from "../../middlewares/checkSubscription";


const router = express.Router();

router.post('/', auth(userRole.admin, userRole.student), checkStudentSubscription, fileUploader.upload.single('uploadCv'), coverLetterController.makeCoverLetter);
router.get('/', auth(userRole.admin, userRole.student), coverLetterController.getAllCoverLetter);
router.get('/:id', auth(userRole.admin, userRole.student), coverLetterController.getCoverLetterById);
router.delete('/:id', auth(userRole.admin, userRole.student), coverLetterController. deleteCoverLetterById);


export const coverLetterRouter = router;