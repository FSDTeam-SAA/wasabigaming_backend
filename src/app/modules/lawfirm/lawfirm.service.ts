import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import User from '../user/user.model';
import { ILawfirm } from './lawfirm.interface';
import LawFirm from './lawfirm.model';

const createLawfirm = async (
  userId: string,
  payload: ILawfirm,
  file?: Express.Multer.File,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  if (file) {
    const lawfirmImage = await fileUploader.uploadToCloudinary(file);
    payload.logo = lawfirmImage.url;
  }
  const result = await LawFirm.create({ ...payload, createBy: user._id });
  return result;
};

const getAllLawfirm = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = [
    'location',
    'status',
    'description',
    'internshipTraining',
    'exertise',
    'aboutFirm',
  ];

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

  const result = await LawFirm.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) {
    throw new AppError(404, 'Lawfirm not found');
  }

  const total = await LawFirm.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleLawfirm = async (id: string) => {
  const result = await LawFirm.findById(id);
  return result;
};

const uploadLawfirm = async (
  userId: string,
  id: string,
  payload: Partial<ILawfirm>,
  file?: Express.Multer.File,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(400, 'User not found');
  }
  const course = await LawFirm.findById(id);
  if (!course) {
    throw new AppError(400, 'lawfirm not found');
  }

  if (user.role !== 'admin') {
    if (course?.createBy?.toString() !== user._id.toString()) {
      throw new AppError(400, 'You are not authorized to update this course');
    }
  }

  if (file) {
    const courseVideos = await fileUploader.uploadToCloudinary(file);
    payload.logo = courseVideos.url;
  }
  const result = await LawFirm.findByIdAndUpdate(
    id,
    { ...payload, createdBy: user._id },
    { new: true },
  );
  return result;
};

const deleteLawfirm = async (userId: string, id: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(400, 'User not found');
  }
  const course = await LawFirm.findById(id);
  if (!course) {
    throw new AppError(400, 'lawfirm not found');
  }

  if (user.role !== 'admin') {
    if (course?.createBy?.toString() !== user._id.toString()) {
      throw new AppError(400, 'You are not authorized to delete this course');
    }
  }

  const result = await LawFirm.findByIdAndDelete(id);
  return result;
};

export const lawfirmService = {
  createLawfirm,
  getAllLawfirm,
  getSingleLawfirm,
  uploadLawfirm,
  deleteLawfirm,
};
