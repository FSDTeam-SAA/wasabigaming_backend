// dynamicWebsite.service.ts
import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import { IDynamicWebsite } from './dynamicWebsite.interface';
import DynamicWebsite from './dynamicWebsite.model';

const createDynamicWebsite = async (
  payload: IDynamicWebsite,
  file?: Express.Multer.File,
) => {

   if (file) {
    const uploadProfile = await fileUploader.uploadToCloudinary(file);
    if (!uploadProfile?.url) {
      throw new AppError(400, 'Failed to upload profile image');
    }
    payload.image = uploadProfile.url;
  }
  const result = await DynamicWebsite.create(payload);
  if (!result) throw new AppError(400, 'Failed to create dynamic website');
  return result;
};

const getAllDynamicWebsite = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const searchableFields = ['title', 'category', 'status'];

  if (searchTerm) {
    andCondition.push({
      $or: searchableFields.map((field) => ({
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

  const result = await DynamicWebsite.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) {
    throw new AppError(404, 'Dynamic website not found');
  }

  const total = await DynamicWebsite.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleDynamicWebsite = async (id: string) => {
  const result = await DynamicWebsite.findById(id);
  if (!result) throw new AppError(404, 'Dynamic website not found');
  return result;
};

const updateDynamicWebsite = async (id: string, payload: Partial<IDynamicWebsite>) => {
  const result = await DynamicWebsite.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new AppError(400, 'Failed to update dynamic website');
  return result;
};

const deleteDynamicWebsite = async (id: string) => {
  const result = await DynamicWebsite.findByIdAndDelete(id);
  if (!result) throw new AppError(400, 'Failed to delete dynamic website');
  return result;
};

export const dynamicWebsiteService = {
  createDynamicWebsite,
  getAllDynamicWebsite,
  getSingleDynamicWebsite,
  updateDynamicWebsite,
  deleteDynamicWebsite,
};