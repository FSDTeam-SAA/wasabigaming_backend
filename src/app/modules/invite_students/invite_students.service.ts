// ==================== contact.service.ts ====================
import InviteStudent from './invite_students.model';
import { IInviteStudent } from './invite_students.interface';
import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import  sendMailer  from "../../helper/sendMailer";



const sendInvite = async(inviteData: IInviteStudent) =>{

    const inviteStudent = await InviteStudent.create(inviteData);

    const emailHtml = `
        <h2>Hello ${inviteData.name},</h2>
        <p>You have been invited as a student.</p>
        <p>Please click the link below to get started:</p>
        <a href="https://your-app-link.com">Join Now</a>
        <br/><br/>
        <p>Regards,<br/>Your Company</p>
    `;

   
    await sendMailer(inviteStudent.email, "Student Invitation", emailHtml);


    return inviteStudent;
}

const getAllInviteStudents = async(params: any, options: IOption) => {

    const { page, limit, skip, sortBy, sortOrder } = pagination(options);
    const { searchTerm, year, ...filterData } = params;

    const andCondition: any[] = [];
    const userSearchableFields = [
        'fullname',
        'email'
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
  }

const getInviteStudentById= async(id: string) => {

    const inviteStudent = await InviteStudent.findById(id);

    if (!inviteStudent) {
      throw new AppError(404, 'Student not found');
    }

    return inviteStudent;
  }

const updatedInviteStudent = async(updateData: IInviteStudent, id: string) => {
    
    const updatedStudentData = await InviteStudent.findById(id);

    if(!updatedStudentData){
        throw new AppError(404, 'Student data not found');
    }

    if (updateData.email !== undefined) {
        const emailExists = await InviteStudent.findOne({
        email: updateData.email,
        _id: { $ne: id }, 
    });

    if (emailExists) {
      throw new AppError(409, "Email already exists");
    }
  }
  const updated = await InviteStudent.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators:true}
  )
  return updated;

}


const deleteInviteStudent = async(id: string) => {

    const inviteStudent = await InviteStudent.findByIdAndDelete(id);

    if (!inviteStudent) {
      throw new AppError(404, 'Student not found');
    }

    return inviteStudent;

}

export const studentInviteService = {
   sendInvite,
   getAllInviteStudents,
   getInviteStudentById ,
   deleteInviteStudent,
   updatedInviteStudent
};