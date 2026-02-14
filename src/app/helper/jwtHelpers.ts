import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import AppError from '../error/appError';
import config from '../config';

const genaretToken = (
  payload: string | object | Buffer,
  secret: Secret,
  expiresIn: string | any,
): string => {
  const options: SignOptions = {
    expiresIn,
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, options);

  return token;
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  const decoded = jwt.verify(token, secret);
  if (!decoded) throw new AppError(401, 'You are not authorized');
  return decoded as JwtPayload;
};

const verifyGoogleToken = (token: string) => {
  try {
    return jwt.verify(token, config.google.clientId as string);
  } catch (error) {
    throw new AppError(401, 'Invalid or expired token');
  }
};

export const jwtHelpers = {
  genaretToken,
  verifyToken,
  verifyGoogleToken,
};
