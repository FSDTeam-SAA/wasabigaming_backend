import config from '../../config';
import AppError from '../../error/appError';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import User from '../user/user.model';
import { authService } from './auth.service';
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const registerUser = catchAsync(async (req, res) => {
  const result = await authService.registerUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully. Please verify your email.',
    data: result,
  });
});
const registerVerifyEmail = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  const result = await authService.registerVerifyEmail(email, otp);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Email verified successfully',
    data: result,
  });
});
// export const loginUser = catchAsync(async (req, res) => {
//   const { email, password, deviceInfo } = req.body;

//   const result = await authService.loginUser(
//     { email, password },
//     deviceInfo,
//     req.headers['user-agent'],
//     req.ip,
//   );

//   res.cookie('refreshToken', result.refreshToken, {
//     httpOnly: true,
//     secure: config.env === 'production',
//     // sameSite: 'strict',
//   });

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User logged in successfully',
//     data: {
//       accessToken: result.accessToken,
//       user: result.user,
//     },
//   });
// });

const googleLogin = catchAsync(async (req, res) => {
  const { idToken, role } = req.body;

  if (!idToken) {
    throw new AppError(400, 'Google ID token is required');
  }

  const result = await authService.googleLogin(idToken, role);

  // নতুন user, role দরকার
  if (result.status === 'needs_role') {
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Role selection required',
      data: {
        needsRole: true,
        tempToken: result.tempToken,
        userInfo: result.userInfo,
      },
    });
  }

  //পুরাতন user login / নতুন user registered — দুটোতেই token দাও
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.status === 'registered'
      ? 'Account created successfully'
      : 'Login successful',
    data: {
      needsRole: false,
      accessToken: result.accessToken,
      user: result.user,
    },
  });
});


const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token refreshed successfully',
    data: result,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await authService.forgotPassword(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OTP sent to your email',
    data: result,
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  const result = await authService.verifyEmail(email, otp);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Email verified successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { email, newPassword } = req.body;
  const result = await authService.resetPassword(email, newPassword);

  // Set the new refreshToken in cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: config.env === 'production',
    // sameSite: 'strict',
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset successfully',
    data: {
      accessToken: result.accessToken,
      user: result.user,
    },
  });
});

const logoutUser = catchAsync(async (req, res) => {
  res.clearCookie('refreshToken');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged out successfully',
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const result = await authService.changePassword(
    req.user?.id,
    oldPassword,
    newPassword,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

export const authController = {
  registerUser,
  registerVerifyEmail,
  verifyEmail,
  // loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  logoutUser,
  changePassword,
  googleLogin,
};
