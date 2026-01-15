import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import { IEvent } from '../event/event.interface';
import User from '../user/user.model';
import Event from './event.model';

const createEvent = async (
  userId: string,
  payload: IEvent,
  file?: Express.Multer.File,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User is not found');

  if (file) {
    const eventImage = await fileUploader.uploadToCloudinary(file);
    payload.thumbnail = eventImage.url;
  }

  const event = await Event.create({ ...payload, createdBy: user._id });
  return event;
};

const getAllEvents = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = ['title', 'description', 'message', 'status'];
  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // YEAR Filter → createdAt
  if (year) {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

    andCondition.push({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Event.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) {
    throw new AppError(404, 'Event not found');
  }

  const total = await Event.countDocuments(whereCondition);

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleEvent = async (id: string) => {
  const result = await Event.findById(id);
  if (!result) {
    throw new AppError(404, 'Event not found');
  }
  return result;
};

const updateEvent = async (
  id: string,
  payload: Partial<IEvent>,
  file?: Express.Multer.File,
) => {
  if (file) {
    const eventImage = await fileUploader.uploadToCloudinary(file);
    payload.thumbnail = eventImage.url;
  }
  const result = await Event.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(404, 'Event not found');
  }
  return result;
};

const deleteEvent = async (id: string) => {
  const result = await Event.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, 'Event not found');
  }
  return result;
};

export const eventService = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
