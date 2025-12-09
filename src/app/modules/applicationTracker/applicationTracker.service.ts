import AppError from '../../error/appError';
import Course from '../course/course.model';
import Task from '../task/task.model';
import { userRole } from '../user/user.constant';
import User from '../user/user.model';
import { IApplicationTracker } from './applicationTracker.interface';
import ApplicationTracker from './applicationTracker.model';

const applicationTrackerOverview = async () => {
  const totalStudent = await User.countDocuments({ role: 'student' });
  const activeCourse = await Course.countDocuments({ status: 'active' });
  const pandingTask = await Task.countDocuments({ status: 'pending' });
  const totalApplication = '';
  return {
    totalStudent,
    activeCourse,
    pandingTask,
    totalApplication,
  };
};

const createApplication = async (
  userId: string,
  payload: IApplicationTracker,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  const school = await User.findById(payload.schoolName);
  if (!user) {
    throw new AppError(404, 'school not found');
  }
  if (school?.role !== userRole.school) {
    throw new AppError(404, 'school not found');
  }
  const result = await ApplicationTracker.create({
    ...payload,
    createBy: user._id,
  });
  if (!result) {
    throw new AppError(404, 'Application not created');
  }
  return result;
};

export const applicationTrackerService = {
  applicationTrackerOverview,
  createApplication,
};
