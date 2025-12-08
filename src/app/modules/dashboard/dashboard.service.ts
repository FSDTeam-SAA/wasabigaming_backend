import { userRole } from '../user/user.constant';
import User from '../user/user.model';

const adminOverview = async () => {
  const totalStudent = await User.countDocuments({ role: userRole.student });
  const totalSchool = await User.countDocuments({ role: userRole.school });
  const activeCourse = '';
  const pendingTask = '';
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
