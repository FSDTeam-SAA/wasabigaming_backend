import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { lawfirmService } from './lawfirm.service';

const createLawfirm = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await lawfirmService.createLawfirm(userId, fromData, files);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Lawfirm created successfully',
    data: result,
  });
});

const getAllLawfirm = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'location',
    'status',
    'description',
    'internshipTraining',
    'exertise',
    'aboutFirm',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await lawfirmService.getAllLawfirm(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lawfirm retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleLawfirm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await lawfirmService.getSingleLawfirm(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lawfirm retrieved successfully',
    data: result,
  });
});
const uploadLawfirm = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const file = req.file as Express.Multer.File;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await lawfirmService.uploadLawfirm(
    userId,
    id!,
    fromData,
    file,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lawfirm image uploaded successfully',
    data: result,
  });
});
const deleteLawfirm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const result = await lawfirmService.deleteLawfirm(userId, id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lawfirm deleted successfully',
    data: result,
  });
});

const approvedLawfirm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await lawfirmService.approvedLawfirm(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lawfirm approved successfully',
    data: result,
  });
});
const getJobLawFirmBased = catchAsync(async(req , res) => {

  const firmName = req.query.firmName as string;

  const result = await lawfirmService.getJobLawFirmBased(firmName);

   sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get all law firm based job successfully',
    data: result,
  });

})

export const lawfirmController = {
  createLawfirm,
  getAllLawfirm,
  getSingleLawfirm,
  uploadLawfirm,
  deleteLawfirm,
  approvedLawfirm,
  getJobLawFirmBased
};
