import pagination, { IOption } from "../../helper/pagenation"
import User from "../user/user.model";
import InviteStudent from "../invite_students/invite_students.model";
import { Types } from 'mongoose';
import AppError from "../../error/appError";

// const getAllStudents = async (
//   params: any,
//   options: IOption,
//   schoolId: string
// ) => {
//   const { page, limit, skip, sortBy, sortOrder } = pagination(options);
//   const { searchTerm, year } = params;


//   const matchStage: any = {
//     status: 'accepted',
//     createBy: new Types.ObjectId(schoolId),
//   };

//   // 📅 Year filter
//   if (year) {
//     matchStage.createdAt = {
//       $gte: new Date(`${year}-01-01T00:00:00.000Z`),
//       $lte: new Date(`${year}-12-31T23:59:59.999Z`),
//     };
//   }

//   const pipeline: any[] = [

//     { $match: matchStage },
//     {
//       $lookup: {
//         from: 'users',
//         localField: 'email',
//         foreignField: 'email',
//         as: 'student',
//       },
//     },
//     { $unwind: '$student' },
//     {
//       $match: {
//         'student.role': 'student',
//       },
//     },
//   ];

//   if (searchTerm) {
//     pipeline.push({
//       $match: {
//         $or: [
//           { 'student.firstName': { $regex: searchTerm, $options: 'i' } },
//           { 'student.lastName': { $regex: searchTerm, $options: 'i' } },
//           { 'student.email': { $regex: searchTerm, $options: 'i' } },
//         ],
//       },
//     });
//   }

//   pipeline.push({
//     $sort: {
//       [sortBy || 'createdAt']: sortOrder === 'asc' ? 1 : -1,
//     },
//   });

//   pipeline.push(
//     { $skip: skip },
//     { $limit: limit }
//   );

//   pipeline.push({
//     $project: {
//       _id: 1,
//       email: 1,
//       status: 1,
//       createdAt: 1,

//       student: {
//         _id: '$student._id',
//         firstName: '$student.firstName',
//         lastName: '$student.lastName',
//         email: '$student.email',
//         grade: '$student.grade',
//         profileImage: '$student.profileImage',
//         status: '$student.status'
//       },
//     },
//   });

//   const countPipeline = [
//     ...pipeline.filter(stage => !('$skip' in stage || '$limit' in stage)),
//     { $count: 'total' },
//   ];

//   const [data, totalResult] = await Promise.all([
//     InviteStudent.aggregate(pipeline),
//     InviteStudent.aggregate(countPipeline),
//   ]);

//   const total = totalResult[0]?.total || 0;

//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data,
//   };
// };
const getSchoolStudents = async (
  userId: string,
  params: any,
  options: IOption,
) => {
  // Check school exists
  const school = await User.findById(userId);
  if (!school) throw new AppError(404, 'School not found');

  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondition: any[] = [];

  // Only accepted invites created by this school
  andCondition.push({ status: 'accepted' });
  andCondition.push({ createBy: userId });

  const searchableFields = ['name', 'email'];

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

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await InviteStudent.find(whereCondition)
    .populate('createBy', 'schoolName email')
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) throw new AppError(404, 'No students found');

  const total = await InviteStudent.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};


const getSingleStudent = async (studentId: string, schoolId: string) => {
    const student = await User.findOne({ _id: studentId, schoolId, role: 'student' })
    .populate('schoolId', 'schoolName schoolType');
    return student;
}

const deleteStudent = async (studentId: string, schoolId: string) => {
    const student = await User.findOneAndDelete({ _id: studentId, schoolId, role: 'student' });
    return student;
}

// const schoolOverview = async (schoolId: string) => {
//   const result = await InviteStudent.aggregate([
//     {
//       $match: {
//         status: 'accepted',
//         createBy: new Types.ObjectId(schoolId),
//       },
//     },
//     {
//       $lookup: {
//         from: 'users',
//         localField: 'email',
//         foreignField: 'email',
//         as: 'student',
//       },
//     },
//     { $unwind: '$student' },
//     {
//       $match: {
//         'student.role': 'student',
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalStudents: { $sum: 1 },
//         activeStudents: {
//           $sum: {
//             $cond: [{ $eq: ['$student.status', 'active'] }, 1, 0],
//           },
//         },
//         inactiveStudents: {
//           $sum: {
//             $cond: [{ $eq: ['$student.status', 'inactive'] }, 1, 0],
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         totalStudents: 1,
//         activeStudents: 1,
//         inactiveStudents: 1,
//       },
//     },
//   ]);

//   return (
//     result[0] || {
//       totalStudents: 0,
//       activeStudents: 0,
//       inactiveStudents: 0,
//     }
//   );
// };

const schoolOverview = async (schoolId: string) => {

  console.log('Generating school overview for school ID:', schoolId);
  // Get all students that belong to this school
  const totalStudents = await User.countDocuments({
    role: 'student',
    schoolId: new Types.ObjectId(schoolId),
  });

  const activeStudents = await User.countDocuments({
    role: 'student',
    schoolId: new Types.ObjectId(schoolId),
    status: 'active',
  });

  const inactiveStudents = await User.countDocuments({
    role: 'student',
    schoolId: new Types.ObjectId(schoolId),
    status: 'inactive',
  });

  return {
    totalStudents,
    activeStudents,
    inactiveStudents,
  };
};



export const schoolManagementService = {
    getSchoolStudents,
    getSingleStudent,
    deleteStudent,
    schoolOverview
}