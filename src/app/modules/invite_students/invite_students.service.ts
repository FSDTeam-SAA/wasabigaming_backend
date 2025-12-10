import InviteStudent from './invite_students.model';
import { IInviteStudent } from './invite_students.interface';
import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import { fileUploader } from '../../helper/fileUploder';
import User from '../user/user.model';
import { userRole } from '../user/user.constant';
import sendMailer from '../../helper/sendMailer';


// const sendInvite = async (
//   userId: string,
//   payload: IInviteStudent | IInviteStudent[],
//   file: Express.Multer.File, 
// ) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new AppError(400, 'User not found');
//   }

//   if (user.role !== userRole.school) {
//     throw new AppError(403, 'Only school users can send invites');
//   }

//   let fileUrl = null;

//   if (!file) {
//     throw new AppError(400, 'No file uploaded');
//   }
//   const uploadedFile = await fileUploader.uploadToCloudinary(file);
//   fileUrl = uploadedFile.url;
//   const students = Array.isArray(payload) ? payload : [payload];
//   const formattedStudents = students.map((student) => ({
//     ...student,
//     createBy: user._id,
//     url: fileUrl,
//   }));

//   const result = await InviteStudent.insertMany(formattedStudents);

  // Optionally send emails
 const sendInvite = async (
  userId: string,
  payload: IInviteStudent | IInviteStudent[],
  file: Express.Multer.File, 
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(400, 'User not found');
  }

  if (user.role !== userRole.school) {
    throw new AppError(403, 'Only school users can send invites');
  }

  if (!file) {
    throw new AppError(400, 'No file uploaded');
  }

  // Upload file once for all students
  const uploadedFile = await fileUploader.uploadToCloudinary(file);
  const fileUrl = uploadedFile.url;

  const students = Array.isArray(payload) ? payload : [payload];
  const formattedStudents = students.map((student) => ({
    ...student,
    createBy: user._id,
    url: fileUrl,
  }));

  const result = await InviteStudent.insertMany(formattedStudents);

  // Send emails concurrently
  await Promise.all(
    formattedStudents.map(student => {
      const emailHtml = `
        <h2>Hello ${student.name},</h2>
        <p>You have been invited as a student.</p>
        <p>Please click the link below to get started:</p>
        <a href="${student.url}">Download file</a>
        <br/><br/>
        <p>Regards,<br/>Best regards</p>
      `;
      return sendMailer(student.email, "Student Invitation", emailHtml);
    })
  );

  return result;
};

const getAllInviteStudents = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = ['name', 'email'];
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

  const result = await InviteStudent.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) {
    throw new AppError(404, 'Student not found');
  }

  const total = await InviteStudent.countDocuments(whereCondition);

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getInviteStudentById = async (id: string) => {
  const inviteStudent = await InviteStudent.findById(id);

  if (!inviteStudent) {
    throw new AppError(404, 'Student not found');
  }

  return inviteStudent;
};

const updatedInviteStudent = async (updateData: IInviteStudent, id: string, userId: string) => {
  const updatedStudentData = await InviteStudent.findById(id);

  if (!updatedStudentData) {
    throw new AppError(404, 'Student data not found');
  }

  if (updateData.email !== undefined) {
    const emailExists = await InviteStudent.findOne({
      email: updateData.email,
      _id: { $ne: id },
    });

    if (emailExists) {
      throw new AppError(409, 'Email already exists');
    }
  }
  const isOwner = updatedStudentData.createBy?.toString() === userId;
  const isAdmin = (await User.findById(userId))?.role === userRole.admin;

  if (!isOwner && !isAdmin) {
    throw new AppError(403, 'You are not authorized to update this student data');
  }

  const updated = await InviteStudent.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return updated;
};

const deleteInviteStudent = async (id: string, userId:string) => {

  const inviteStudentData = await InviteStudent.findById(id);
  if (!inviteStudentData) {
    throw new AppError(404, 'Student not found');
  }
  const isOwner = inviteStudentData.createBy?.toString() === userId;
  const isAdmin = (await User.findById(userId))?.role === userRole.admin;

  if (!isOwner && !isAdmin) {
    throw new AppError(403, 'You are not authorized to update this student data');
  }

  await InviteStudent.findByIdAndDelete(id);

  return inviteStudentData;
};

export const studentInviteService = {
  sendInvite,
  getAllInviteStudents,
  getInviteStudentById,
  deleteInviteStudent,
  updatedInviteStudent,
};
