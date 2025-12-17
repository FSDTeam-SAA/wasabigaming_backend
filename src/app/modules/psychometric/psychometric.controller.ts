import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { psychometricService } from './psychometric.service';

const createPsychometric = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await psychometricService.createPsychometric(userId, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Psychometric created successfully',
    data: result,
  });
});

const getAllPsychometric = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'title',
    'description',
    'type',
    'questions.difficulty',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await psychometricService.getAllPsychometric(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Psychometrics retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getPsychometricById = catchAsync(async (req, res) => {
  const result = await psychometricService.getPsychometricById(req.params.id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Psychometric retrieved successfully',
    data: result,
  });
});

const updatePsychometric = catchAsync(async (req, res) => {
  const result = await psychometricService.updatePsychometric(
    req.params.id!,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Psychometric updated successfully',
    data: result,
  });
});

const deletePsychometric = catchAsync(async (req, res) => {
  const result = await psychometricService.deletePsychometric(req.params.id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Psychometric deleted successfully',
    data: result,
  });
});

export const psychometricController = {
  createPsychometric,
  getAllPsychometric,
  getPsychometricById,
  updatePsychometric,
  deletePsychometric,
};
