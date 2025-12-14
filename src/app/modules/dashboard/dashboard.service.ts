import Course from '../course/course.model';
import Task from '../task/task.model';
import { userRole } from '../user/user.constant';
import User from '../user/user.model';

const adminOverview = async () => {
  const totalStudent = await User.countDocuments({ role: userRole.student });
  const totalSchool = await User.countDocuments({ role: userRole.school });
  const activeCourse = await Course.countDocuments({ status: 'active' });
  const pendingTask = await Task.countDocuments({ status: 'pending' });
  const quizeResult = '';

  return {
    totalStudent,
    totalSchool,
    activeCourse,
    pendingTask,
    quizeResult,
  };
};

export const dashyboardService = {
  adminOverview,
};
