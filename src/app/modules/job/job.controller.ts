import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { jobService } from './job.service';

const createManualJob = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await jobService.createManualJob(userId, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Job created successfully',
    data: result,
  });
});

const createJob = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { job_title, location } = req.body;
  const result = await jobService.createJob(userId, job_title, location);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Job created successfully',
    data: result,
  });
});

const getAllJobs = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'status',
    'additionalInfo',
    'responsibilities',
    'description',
    'jobStatus',
    'salaryRange',
    'level',
    'postedBy',
    'companyType',
    'companyName',
    'location',
    'title',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await jobService.getAllJobs(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Jobs retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const singleJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await jobService.singleJob(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job retrieved successfully',
    data: result,
  });
});

const updateJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const result = await jobService.updateJob(userId, id!, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job updated successfully',
    data: result,
  });
});

const deleteJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const result = await jobService.deleteJob(userId, id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job deleted successfully',
    data: result,
  });
});

const approvedJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await jobService.approvedJob(id!);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job approved successfully',
    data: result,
  });
});

const appliedJob = catchAsync(async (req, res) => {
  const userId = req.user?.id;

  const filters = pick(req.query, [
    'searchTerm',
    'title',
    'location',
    'companyName',
    'companyType',
    'postedBy',
    'level',
  ]);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await jobService.appliedJob(userId, filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Applied jobs retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const jobController = {
  createJob,
  getAllJobs,
  singleJob,
  updateJob,
  deleteJob,
  approvedJob,
  createManualJob,
  appliedJob,
};
