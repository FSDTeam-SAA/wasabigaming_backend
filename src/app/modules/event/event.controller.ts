import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { eventService } from './event.service';

const createEvent = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const file = req.file as Express.Multer.File;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;

  const result = await eventService.createEvent(userId, fromData, file);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Event created successfully',
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'searchTerm',
    'title',
    'description',
    'message',
    'status',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await eventService.getAllEvents(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Events retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getEventById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventService.getSingleEvent(id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event retrieved successfully',
    data: result,
  });
});
const updateEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const file = req.file as Express.Multer.File;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;

  const result = await eventService.updateEvent(id!, fromData, file);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event updated successfully',
    data: result,
  });
});
const deleteEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await eventService.deleteEvent(id!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event deleted successfully',
    data: result,
  });
});

export const eventController = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
