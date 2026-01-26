import pick from "../../helper/pick";
import catchAsync from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendResponse";
import { coverLetterService } from "./coverLetter.service";

const makeCoverLetter = catchAsync(async(req , res) => {

    const userId = req.user.id;
    const file = req.file;
    const result = await coverLetterService.makeCoverLetter(req.body, file, userId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Cover build successfully',
        data: result,
    });

})

const getAllCoverLetter = catchAsync(async(req , res) => {

    const userId = req.user.id;
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await coverLetterService.getAllCoverLetter(userId!, options);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Get all cover letter successfully',
        data: result,
    });

})

const getCoverLetterById = catchAsync(async(req , res) => {

    const id = req.params.id;
    const result = await coverLetterService.getCoverLetterById(id!);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Get single cover letter successfully',
        data: result,
    });

})

const deleteCoverLetterById = catchAsync(async(req , res) => {

    const id = req.params.id;
    const result = await coverLetterService.deleteCoverLetterById(id!);

     sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Deleted cover letter successfully',
        data: result,
    });

})

export const coverLetterController = {
    makeCoverLetter,
    getAllCoverLetter,
    getCoverLetterById,
    deleteCoverLetterById
}