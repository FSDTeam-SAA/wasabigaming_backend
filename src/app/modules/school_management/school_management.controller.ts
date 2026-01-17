import pick from "../../helper/pick";
import catchAsync from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendResponse";
import { schoolManagementService } from "./school_management.service";

const getAllStudents = catchAsync(async(req , res) =>{

    const schoolId = req.user.id;
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const filters = pick(req.query, ['searchTerm', 'status', 'year', 'firstName', 'lastName', 'email']);
    const students = await schoolManagementService.getAllStudents(options, filters, schoolId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Students retrieved successfully',
        data: students,
      });


})

const getSingleStudent = catchAsync(async(req , res) =>{

    const studentId = req.params.id;
    const schoolId = req.user.id;

    const student = await schoolManagementService.getSingleStudent(studentId!, schoolId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Student retrieved successfully',
        data: student,
      });
});
const deleteStudent = catchAsync(async(req , res) =>{

    const studentId = req.params.id;
    const schoolId = req.user.id;
    const student = await schoolManagementService.deleteStudent(studentId!, schoolId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Student deleted successfully',
        data: student,
      });
});

const schoolOverview = catchAsync(async (req, res) => {
    const schoolId = req.user.id;
    const overview = await schoolManagementService.schoolOverview(schoolId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'School overview retrieved successfully',
        data: overview,
      });
});
export const schoolManagementController = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    schoolOverview
}