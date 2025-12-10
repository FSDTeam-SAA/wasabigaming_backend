

import multer from 'multer';
import streamifier from 'streamifier';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import AppError from '../error/appError';
import config from '../config';

// Cloudinary Config
cloudinary.config({
  cloud_name: config.cloudinary.name!,
  api_key: config.cloudinary.apiKey!,
  api_secret: config.cloudinary.apiSecret!,
});

// sanitize filename
const sanitizeFileName = (name: string) => {
  return name
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .toLowerCase();
};

// Multer memory storage
// const upload = multer({
//   storage: multer.memoryStorage(),
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv|csv/;
//     const ext = path.extname(file.originalname).toLowerCase();

//     if (allowedTypes.test(ext)) {
//       cb(null, true);
//     } else {
//       cb(new AppError(400, 'Only images & videos are allowed'));
//     }
//   },
// });

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv|csv/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedTypes.test(ext)) {
      cb(new AppError(400, 'Only images, videos & CSV are allowed'));
    } else {
      cb(null, true);
    }
  },
});


// Upload stream to Cloudinary
const uploadToCloudinary = (
  file: Express.Multer.File,
): Promise<{ url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new AppError(400, 'No file provided'));

    const ext = path.extname(file.originalname).toLowerCase();
    const isVideo = /mp4|mov|avi|mkv/.test(ext);
    const safeName = `${Date.now()}-${sanitizeFileName(file.originalname)}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'Note',
        resource_type: isVideo ? 'video' : 'image',
        public_id: safeName,
        ...(isVideo
          ? {}
          : {
              transformation: {
                width: 500,
                height: 500,
                crop: 'limit',
              },
            }),
      },
      (error, result) => {
        if (error || !result)
          return reject(error || new AppError(400, 'Cloudinary upload failed'));

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
