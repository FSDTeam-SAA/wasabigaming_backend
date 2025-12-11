import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { premiumService } from './priemium.service';

const createPremium = catchAsync(async (req, res) => {
  const result = await premiumService.createPremium(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Premium created successfully',
    data: result,
  });
});

const getAllPremium = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'name',
    'type',
    'features',
    'status',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await premiumService.getAllPremium(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Premiums retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePremium = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await premiumService.getSinglePremium(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Premium retrieved successfully',
    data: result,
  });
});

const updatePremium = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await premiumService.updatePremium(id!, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Premium updated successfully',
    data: result,
  });
});
const deletePremium = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await premiumService.deletePremium(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Premium deleted successfully',
    data: result,
  });
});

const activePremium = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await premiumService.activePremium(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Premium active successfully',
    data: result,
  });
});

const paySubscription = catchAsync(async (req, res) => {
  const result = await premiumService.paySubscription(
    req.user?.id,
    req.params.id!,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscription paid successfully',
    data: result,
  });
});

export const premiumController = {
  createPremium,
  getAllPremium,
  getSinglePremium,
  updatePremium,
  deletePremium,
  activePremium,
  paySubscription,
};
