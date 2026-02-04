import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import { IAiassessment } from './aiassessment.interface';
import Aiassessment from './aiassessment.model';

const createAiassessment = async (
  payload: IAiassessment,
  file?: Express.Multer.File,
) => {
  if (file) {
    const aiassessmentFile = await fileUploader.uploadToCloudinary(file);
    payload.logo = aiassessmentFile.url;
  }
  const result = await Aiassessment.create(payload);
  return result;
};

const getAllAiassessment = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = ['status', 'title', 'discription'];

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

  const result = await Aiassessment.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);
  // .populate('applicationUser');

  if (!result) {
    throw new AppError(404, 'Aiassessment not found');
  }

  const total = await Aiassessment.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleAiassessment = async (id: string) => {
  const result = await Aiassessment.findById(id);
  if (!result) throw new AppError(404, 'Aiassessment not found');
  return result;
};

const updateAiassessment = async (
  id: string,
  payload: Partial<IAiassessment>,
  file?: Express.Multer.File,
) => {
  if (file) {
    const aiassessmentFile = await fileUploader.uploadToCloudinary(file);
    payload.logo = aiassessmentFile.url;
  }

  const result = await Aiassessment.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) throw new AppError(404, 'Aiassessment not found');
  return result;
};

const deleteAiassessment = async (id: string) => {
  const result = await Aiassessment.findByIdAndDelete(id);
  if (!result) throw new AppError(404, 'Aiassessment not found');
  return result;
};

export const aiassessmentService = {
  createAiassessment,
  getAllAiassessment,
  getSingleAiassessment,
  updateAiassessment,
  deleteAiassessment,
};
