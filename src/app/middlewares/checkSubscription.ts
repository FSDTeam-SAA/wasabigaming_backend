import User from '../modules/user/user.model';
import AppError from '../error/appError';
import catchAsync from '../utils/catchAsycn';

export const checkStudentSubscription = catchAsync(async (req, res, next) => {
  const userId = req.user?.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.isSubscription) {
    return next();
  }

  if (user.schoolId) {
    const school = await User.findById(user.schoolId);
    if (!school) {
      throw new AppError(404, "School not found");
    }

    if (!school.isSubscription) {
      throw new AppError(400, "You are not allowed to access this feature");
    }
  } else {
  
     throw new AppError(400, "You are not allowed to access this feature");
  }

  return next();
});

