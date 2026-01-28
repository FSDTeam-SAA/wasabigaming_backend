import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { aiassessmentService } from './aiassessment.service';

const createAiassessment = catchAsync(async (req, res) => {
  const file = req.file;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await aiassessmentService.createAiassessment(fromData, file);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Aiassessment created successfully',
    data: result,
  });
});

const getAllAiassessments = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'status',
    'title',
    'discription',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await aiassessmentService.getAllAiassessment(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Aiassessments retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAiassessment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await aiassessmentService.getSingleAiassessment(id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Aiassessment retrieved successfully',
    data: result,
  });
});

const updateAiassessment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const file = req.file;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await aiassessmentService.updateAiassessment(
    id!,
    fromData,
    file,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Aiassessment updated successfully',
    data: result,
  });
});
const deleteAiassessment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await aiassessmentService.deleteAiassessment(id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Aiassessment deleted successfully',
    data: result,
  });
});

export const aiassessmentController = {
  createAiassessment,
  getAllAiassessments,
  getSingleAiassessment,
  updateAiassessment,
  deleteAiassessment,
};
