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
export const loginUser = catchAsync(async (req, res) => {
  const { email, password, deviceInfo } = req.body;

  const result = await authService.loginUser(
    { email, password },
    deviceInfo,
    req.headers['user-agent'],
    req.ip,
  );

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: config.env === 'production',
    // sameSite: 'strict',
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken: result.accessToken,
      user: result.user,
    },
  });
});

// const googleLogin = catchAsync(async (req, res) => {
//   const { idToken, role } = req.body;

//   if (!idToken) {
//     throw new AppError(400, 'Google ID token is required');
//   }

//   const result = await authService.googleLogin(idToken, role);

//   // নতুন user, role দরকার
//   if (result.status === 'needs_role') {
//     return sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: 'Role selection required',
//       data: {
//         needsRole: true,
//         tempToken: result.tempToken,
//         userInfo: result.userInfo,
//       },
//     });
//   }

//   //পুরাতন user login / নতুন user registered — দুটোতেই token দাও
//   res.cookie('refreshToken', result.refreshToken, {
//     httpOnly: true,
//     secure: config.env === 'production',
//     sameSite: 'strict',
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });

//   return sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: result.status === 'registered'
//       ? 'Account created successfully'
//       : 'Login successful',
//     data: {
//       needsRole: false,
//       accessToken: result.accessToken,
//       user: result.user,
//     },
//   });
// });

export const googleLogin = catchAsync(async (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Step 1: Verify token with Google
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    if (!googleClientId) {
      return res.status(500).json({ message: "Google client ID is not configured" });
    }
    const client = new OAuth2Client(googleClientId);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: "Invalid Google token" });
    }

    const { email, name, picture } = payload;

    // Step 2: Check if user already exists in MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      // Step 3: Create new user if first time
      user = await User.create({
        name,
        email,
        picture,
        password: null, // no password for Google users
        authType: "google",
      });
    }

    // Step 4: Generate your own JWT token
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Step 5: Return token to frontend
    return res.status(200).json({
      success: true,
      token: jwtToken,
      user: {
        id: user._id,
        name: (user as any)?.name || '',
        email: (user as any)?.email || '',
        picture: (user as any)?.picture || '',
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
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  logoutUser,
  changePassword,
  googleLogin,
};
