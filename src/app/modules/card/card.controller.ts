import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { cardService } from './card.service';

const createCard = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const file = req.file as Express.Multer.File;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await cardService.createCard(userId, fromData, file);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Card created successfully',
    data: result,
  });
});

const getAllCard = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'price']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await cardService.getAllCard(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cards fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await cardService.getSingleCard(id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Card fetched successfully',
    data: result,
  });
});

const updateCard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const file = req.file as Express.Multer.File;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await cardService.updateCard(id!, fromData, file);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Card updated successfully',
    data: result,
  });
});
const deleteCard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await cardService.deleteCard(id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Card deleted successfully',
    data: result,
  });
});

export const cardController = {
  createCard,
  getAllCard,
  getSingleCard,
  updateCard,
  deleteCard,
};
