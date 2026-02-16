// community.service.ts
import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import { ICommunity } from './joinCommunity.interface';
import Community from './joinCommunity.model';


const createCommunity = async (payload: ICommunity) => {
  const existingMember = await Community.findOne({ email: payload.email });
  if (existingMember) {
    throw new AppError(400, 'Email already registered in the community');
  }

  const result = await Community.create(payload);
  if (!result) throw new AppError(400, 'Failed to join community');
  return result;
};

const getAllCommunity = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const searchableFields = [
    'fullName',
    'email',
    'cityOrTown',
    'phoneNumber',
    'yearGroup',
    'status',
  ];

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

  const result = await Community.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) {
    throw new AppError(404, 'Community members not found');
  }

  const total = await Community.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleCommunity = async (id: string) => {
  const result = await Community.findById(id);
  if (!result) throw new AppError(404, 'Community member not found');
  return result;
};

const updateCommunity = async (id: string, payload: Partial<ICommunity>) => {
  const result = await Community.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new AppError(400, 'Failed to update community member');
  return result;
};

const deleteCommunity = async (id: string) => {
  const result = await Community.findByIdAndDelete(id);
  if (!result) throw new AppError(400, 'Failed to delete community member');
  return result;
};

export const communityService = {
  createCommunity,
  getAllCommunity,
  getSingleCommunity,
  updateCommunity,
  deleteCommunity,
};