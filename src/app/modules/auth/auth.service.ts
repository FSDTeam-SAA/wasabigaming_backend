/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../error/appError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import { jwtHelpers } from '../../helper/jwtHelpers';
import sendMailer from '../../helper/sendMailer';
import bcrypt from 'bcryptjs';
import createOtpTemplate from '../../utils/createOtpTemplate';
import { userRole } from '../user/user.constant';
import { UAParser } from 'ua-parser-js';

const registerUser = async (payload: Partial<IUser>) => {
  let user = await User.findOne({ email: payload.email });

  // If user exists and already registered, throw error
  if (user && user.registered) {
    throw new AppError(400, 'User already exists and verified');
  }

  // If user exists but not verified, resend OTP
  if (user && !user.registered) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20 mins
    await user.save();

    await sendMailer(
      user.email,
      user.firstName + ' ' + user.lastName,
      createOtpTemplate(otp, user.email, 'Wasabigaming'),
    );
    return { message: 'OTP resent successfully', user };
  }

  // Create new user
  const idx = Math.floor(Math.random() * 100);
  payload.profileImage = `https://avatar.iran.liara.run/public/${idx}.png`;

  if (payload.role === userRole.school) {
    console.log(
      'payload.schoolName',
      payload.schoolName,
      'mahabur',
      user?.schoolName,
    );
    if (!payload.schoolName) {
      throw new AppError(400, 'School name is required');
    }
    if (payload.schoolName === user?.schoolName) {
      throw new AppError(400, 'This school name is already exist');
    }
    payload.schoolStatus = 'pending';

    user = await User.create(payload);

    const shareLink = `${config?.frontendUrl}/accepted?schoolId=${user._id}`;
    user.shareLink = shareLink;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20 mins

    await user.save();

    await sendMailer(
      user.email,
      user.firstName + ' ' + user.lastName,
      createOtpTemplate(otp, user.email, 'Wasabigaming'),
    );
    return user;
  }

  if (payload.role === userRole.student) {
    if (!payload.firstName) {
      throw new AppError(400, 'First name is required');
    }
    if (!payload.lastName) {
      throw new AppError(400, 'Last name is required');
    }

    user = await User.create(payload);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20 mins
    await user.save();

    await sendMailer(
      user.email,
      user.schoolName || user.firstName,
      createOtpTemplate(otp, user.email, 'Wasabigaming'),
    );
    return user;
  }

  if (payload.role === userRole.admin) {
    user = await User.create(payload);
    return user;
  }
};

const registerVerifyEmail = async (email: string, otp: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(401, 'User not found');

  if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
    throw new AppError(400, 'Invalid or expired OTP');
  }

  user.registered = true;
  (user as any).otp = undefined;
  (user as any).otpExpiry = undefined;
  await user.save();

  return { message: 'user registered successfully' };
};

export const loginUser = async (
  payload: Partial<IUser>,
  deviceInfo: any,
  userAgentHeader?: string,
  ipAddress?: string,
) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw new AppError(401, 'User not found');
  if (!payload.password) throw new AppError(400, 'Password is required');
  if (!user.registered)
    throw new AppError(401, 'Please verify your email first');

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) throw new AppError(401, 'Password not matched');

  // Generate tokens
  const accessToken = jwtHelpers.genaretToken(
    { id: user._id, role: user.role, email: user.email },
    config.jwt.accessTokenSecret as Secret,
    config.jwt.accessTokenExpires,
  );

  const refreshToken = jwtHelpers.genaretToken(
    { id: user._id, role: user.role, email: user.email },
    config.jwt.refreshTokenSecret as Secret,
    config.jwt.refreshTokenExpires,
  );

  // Determine device name
  let deviceName = 'Unknown Device';
  if (deviceInfo && deviceInfo.name) {
    deviceName = `${deviceInfo.name} (${deviceInfo.os || ''})`.trim();
  } else if (userAgentHeader) {
    const parser = new UAParser(userAgentHeader);
    const result = parser.getResult();
    deviceName =
      result.device.model ||
      `${result.browser.name || 'Unknown Browser'} on ${result.os.name || 'Unknown OS'}`;
  }

  // Save login history
  user.loginHistory.unshift({
    device: deviceName,
    ipAddress: ipAddress || 'Unknown IP',
    loginTime: { type: new Date() },
  });

  await user.save({ validateBeforeSave: false });

  const { password, ...userWithoutPassword } = user.toObject();

  return { accessToken, refreshToken, user: userWithoutPassword };
};

// auth.service.ts
const googleLogin = async (idToken: string, role?: string) => {
  try {
    console.log('=== GOOGLE LOGIN BACKEND START ===');

    const payload = await jwtHelpers.verifyGoogleToken(idToken);

    const email = payload.email!;
    const firstName = payload.given_name || payload.name || 'Google User';
    const lastName = payload.family_name || '';
    const profileImage = payload.picture;

    // EXISTING USER CHECK - সবার আগে এটা check হয়
    let user = await User.findOne({ email });

    // পুরাতন user হলে DIRECTLY LOGIN (কোন role popup নেই)
    if (user) {
      console.log('👤 Existing user login - Direct login');
      console.log('🔒 Role locked as:', user.role);

      const accessToken = jwtHelpers.genaretToken(
        { id: user._id, role: user.role, email: user.email },
        config.jwt.accessTokenSecret as Secret,
        config.jwt.accessTokenExpires,
      );

      const refreshToken = jwtHelpers.genaretToken(
        { id: user._id, role: user.role, email: user.email },
        config.jwt.refreshTokenSecret as Secret,
        config.jwt.refreshTokenExpires,
      );

      const { password, ...userWithoutPassword } = user.toObject();

      return {
        accessToken, // এখানে token আছে
        refreshToken, // এখানে token আছে
        user: userWithoutPassword,
      };
    }

    // নতুন user হলে ONLY THEN role selection popup দেখাবে
    console.log('🆕 New Google user detected - role selection required');

    const tempToken = jwtHelpers.genaretToken(
      {
        email,
        firstName,
        lastName,
        profileImage,
        isTemp: true,
      },
      config.jwt.accessTokenSecret as Secret,
      '15m',
    );

    return {
      needsRole: true, // নতুন user এর জন্য role চাইবে
      tempToken,
      userInfo: {
        email,
        firstName,
        lastName,
        profileImage,
      },
    };
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

const refreshToken = async (token: string) => {
  const varifiedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.refreshTokenSecret as Secret,
  ) as JwtPayload;

  const user = await User.findById(varifiedToken.id);
  if (!user) throw new AppError(401, 'User not found');

  const accessToken = jwtHelpers.genaretToken(
    { id: user._id, role: user.role, email: user.email },
    config.jwt.accessTokenSecret as Secret,
    config.jwt.accessTokenExpires,
  );

  const { password, ...userWithoutPassword } = user.toObject();
  return { accessToken, user: userWithoutPassword };
};

const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(401, 'User not found');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
  await user.save();

  await sendMailer(
    user.email,
    user.firstName + ' ' + user.lastName,
    createOtpTemplate(otp, user.email, 'Your Company'),
  );

  return { message: 'OTP sent to your email' };
};

const verifyEmail = async (email: string, otp: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(401, 'User not found');

  if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
    throw new AppError(400, 'Invalid or expired OTP');
  }

  user.verified = true;
  (user as any).otp = undefined;
  (user as any).otpExpiry = undefined;
  await user.save();

  return { message: 'Email verified successfully' };
};

const resetPassword = async (email: string, newPassword: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(404, 'User not found');

  user.password = newPassword;
  (user as any).otp = undefined;
  (user as any).otpExpiry = undefined;
  await user.save();

  // Auto-login after reset
  const accessToken = jwtHelpers.genaretToken(
    { id: user._id, role: user.role, email: user.email },
    config.jwt.accessTokenSecret as Secret,
    config.jwt.accessTokenExpires,
  );
  const refreshToken = jwtHelpers.genaretToken(
    { id: user._id, role: user.role, email: user.email },
    config.jwt.refreshTokenSecret as Secret,
    config.jwt.refreshTokenExpires,
  );

  const { password, ...userWithoutPassword } = user.toObject();
  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  };
};

const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatched) throw new AppError(400, 'Password not matched');

  user.password = newPassword;
  await user.save();

  return { message: 'Password changed successfully' };
};

export const authService = {
  registerUser,
  registerVerifyEmail,
  loginUser,
  refreshToken,
  forgotPassword,
  verifyEmail,
  resetPassword,
  changePassword,
  googleLogin,
};
