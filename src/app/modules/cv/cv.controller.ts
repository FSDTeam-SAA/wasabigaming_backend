import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { cvService } from './cv.service';

const applyJob = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { jobId } = req.params;
  const fromdata = req.body.data ? JSON.parse(req.body.data) : req.body;
  const file = req.file as Express.Multer.File;
  const result = await cvService.applyJob(userId!, jobId!, fromdata, file);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'CV created successfully',
    data: result,
  });
});

const getAllCv = catchAsync(async (req, res) => {
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await cvService.getAllCv(options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'CVs retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCv = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await cvService.getSingleCv(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'CV retrieved successfully',
    data: result,
  });
});

export const cvController = {
  applyJob,
  getAllCv,
  getSingleCv,
};
