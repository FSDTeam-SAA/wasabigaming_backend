import User from '../modules/user/user.model';
import AppError from '../error/appError';
import catchAsync from '../utils/catchAsycn';
import Premium from '../modules/premium/premium.model';

export const checkStudentSubscription = catchAsync(async (req, res, next) => {
  const userId = req.user?.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.isSubscription) {
    const subscription = await Premium.findOne({ _id : user.subscription });
    if (!subscription) {
      throw new AppError(400, "Subscription not found");
    }
    if(subscription.name === "Pro Plan"){
      return next();
    }
  }

  if (user.schoolId) {
    const school = await User.findById(user.schoolId);
    if (!school) {
      throw new AppError(404, "School not found");
    }

    if (!school.isSubscription) {
      throw new AppError(400, "Subscription plan error ");
    }
    const subscription = await Premium.findOne({ _id : school.subscription });
    if (!subscription) {
      throw new AppError(400, "Subscription not found");
    }
    if(subscription.name === "Pro Plan"){
      return next();
    }
    
  } else {
  
     throw new AppError(400, "Subscription plan error");
  }
});

