import { da } from "zod/v4/locales/index.cjs";
import pagination, { IOption } from "../../helper/pagenation"
import User from "../user/user.model";

const getAllStudents = async (params: any, options: IOption, schoolId: string) => {

      const { page, limit, skip, sortBy, sortOrder } = pagination(options);
      const { searchTerm, year, ...filterData } = params;

      const andCondition: any[] = [];

      andCondition.push({ role: 'student' });
      if (schoolId) {
        andCondition.push({ schoolId });
      }
      const userSearchableFields = [
        'firstName',
        'lastName',
        'email',
        'status',
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

    if (year) {
        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
        andCondition.push({ createdAt: { $gte: startDate, $lte: endDate } });
    }
    const whereCondition = andCondition.length ? { $and: andCondition } : {};
    const result = await User.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any)
    .populate('schoolId', 'schoolName schoolType');

    const total = await User.countDocuments(whereCondition);

    return { meta: { total, page, limit }, data: result };
}

const getSingleStudent = async (studentId: string, schoolId: string) => {
    const student = await User.findOne({ _id: studentId, schoolId, role: 'student' })
    .populate('schoolId', 'schoolName schoolType');
    return student;
}

const deleteStudent = async (studentId: string, schoolId: string) => {
    const student = await User.findOneAndDelete({ _id: studentId, schoolId, role: 'student' });
    return student;
}

const schoolOverview = async (schoolId: string) => {
    const totalStudents = await User.countDocuments({ schoolId, role: 'student' });
    const activeStudents = await User.countDocuments({ schoolId, role: 'student', status: 'active' });
    const inactiveStudents = await User.countDocuments({ schoolId, role: 'student', status: 'inactive' });
    return {
        totalStudents,
        activeStudents,
        inactiveStudents,
    };
}
export const schoolManagementService = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    schoolOverview
}