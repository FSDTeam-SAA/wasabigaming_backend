import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { psychometricResultService } from './psychometricResult.service';

const getMyAllPsychometricResults = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const filters = pick(req.query, [
    'searchTerm',
    'aiFeedback',
    'areasToImprove',
    'strengths',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await psychometricResultService.getMyAllPsychometricResults(
    userId,
    filters,
    options,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Psychometric results retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const singlePsychometricResult = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await psychometricResultService.singlePsychometricResult(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Psychometric result retrieved successfully',
    data: result,
  });
});

const deletePsychometricResult = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await psychometricResultService.deletePsychometricResult(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Psychometric result deleted successfully',
    data: result,
  });
});

export const psychometricResultController = {
  getMyAllPsychometricResults,
  singlePsychometricResult,
  deletePsychometricResult,
};
