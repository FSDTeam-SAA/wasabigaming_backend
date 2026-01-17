import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import { userRole } from '../user/user.constant';
import User from '../user/user.model';
import { IManageWebsite } from './website.interface';
// import { IWebsite } from './website.interface';
import Website from './website.model';

const createWebsite = async (
  payload: Partial<IManageWebsite>,
  files?: Express.Multer.File[],
) => {
  if (files && files.length > 0) {
    const images = await Promise.all(
      files.map(async (file) => {
        const result = await fileUploader.uploadToCloudinary(file);
        return result.url;
      }),
    );
    payload.thumbnail = images;
  }
  const result = Website.create(payload);
  if (!result) throw new AppError(400, 'Website not created');
  return result;
};

const updateWebsite = async (
  id: string,
  payload: Partial<IManageWebsite>,
  files?: Express.Multer.File[],
) => {
  const isExist = await Website.findById(id);
  if (!isExist) throw new AppError(404, 'Website not found');

  if (files && files.length > 0) {
    const images = await Promise.all(
      files.map(async (file) => {
        const result = await fileUploader.uploadToCloudinary(file);
        return result.url;
      }),
    );
    payload.thumbnail = images;
  }
  const result = await Website.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) throw new AppError(400, 'Website not updated');
  return result;
};

// const updateWebsite = async (
//   userId: string,
//   id: string,
//   payload: Partial<IManageWebsite>,
// ) => {
//   const user = await User.findById(userId);
//   if (!user) throw new AppError(404, 'User not found');

//   const isExist = await Website.findById(id);
//   if (!isExist) throw new AppError(404, 'Website not found');
//   if (user.role !== userRole.admin) {
//     if (isExist.createBy.toString() !== userId)
//       throw new AppError(403, 'You are not authorized to update this website');
//   }
//   const result = await Website.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   if (!result) throw new AppError(400, 'Website not updated');
//   return result;
// };

const getAllWebsite = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = ['subtitle', 'type', 'title', 'description'];

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

  const result = await Website.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) {
    throw new AppError(404, 'website not found');
  }

  const total = await Website.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getWebsiteById = async (id: string) => {
  const result = await Website.findById(id);
  if (!result) throw new AppError(404, 'Website not found');
  return result;
};

const deleteWebsite = async (id: string) => {
  const result = await Website.findByIdAndDelete(id);
  if (!result) throw new AppError(404, 'Website not found');
  return result;
};

// const getWebsiteByKey = async (key: string) => {
//   const result = await Website.findOne({ key });
//   if (!result) throw new AppError(404, 'Website not found');
//   return result;
// };

// const removeWebsite = async (id: string) => {
//   const result = await Website.findByIdAndDelete(id);
//   return result;
// };

export const websiteService = {
  createWebsite,
  updateWebsite,
  getAllWebsite,
  getWebsiteById,
  deleteWebsite,
  // getWebsiteByKey,
  // removeWebsite,
};
