import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { careanalysisService } from './careanalysis.service';

const createCareanalysisl = catchAsync(async (req, res) => {
  const result = await careanalysisService.createCareanalysis(
    req.user?.id,
    req.params.id!,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Careanalysis created successfully',
    data: result,
  });
});

const getSingleCareanalysisl = catchAsync(async (req, res) => {
  const result = await careanalysisService.getSingleCareanalysis(
    req.params.id!,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Careanalysis fetched successfully',
    data: result,
  });
});

const updateCareanalysisl = catchAsync(async (req, res) => {
  const result = await careanalysisService.updateCareanalysis(
    req.params.id!,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Careanalysis updated successfully',
    data: result,
  });
});
export const careanalysislController = {
  createCareanalysisl,
  getSingleCareanalysisl,
  updateCareanalysisl,
};
