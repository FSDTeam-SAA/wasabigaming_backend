// ==================== contact.controller.ts ====================
import { studentInviteService } from './invite_students.service';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import pick from '../../helper/pick';
import { parse } from 'csv-parse/sync';
import AppError from '../../error/appError';

const sendInvite = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const file = req.file as Express.Multer.File;
  
  // JSON parse করার সময় error handling যোগ করুন
  let studentData;
  try {
    studentData = req.body.data ? JSON.parse(req.body.data) : req.body;
  } catch (error) {
    throw new AppError(400, 'Invalid JSON format in data field');
  }
  
  const result = await studentInviteService.sendInvite(userId, studentData, file);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Invitations sent successfully',
    data: result,
  });
});

const getAllInviteStudents = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'fullName', 'email']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await studentInviteService.getAllInviteStudents(
    filters,
    options,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get all invite data successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getInviteStudentById = catchAsync(async (req, res) => {
  const { inviteStudentId } = req.params;

  const inviteStudent = await studentInviteService.getInviteStudentById(
    inviteStudentId!,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get single invite student successfully',
    data: inviteStudent,
  });
});

const updateInviteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const updateInformation = await studentInviteService.updatedInviteStudent(
    req.body,
    studentId!,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Updated data invite student ',
    data: updateInformation,
  });
});

const deleteInviteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  await studentInviteService.deleteInviteStudent(studentId!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted invite information successfully',
  });
});

export const inviteStudentController = {
  sendInvite,
  getAllInviteStudents,
  getInviteStudentById,
  deleteInviteStudent,
  updateInviteStudent,
};
