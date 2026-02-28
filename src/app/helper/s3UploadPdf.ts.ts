import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import config from '../config';
import AppError from '../error/appError';

const s3Client = new S3Client({
  region: config.aws.region!,
  credentials: {
    accessKeyId: config.aws.accessKeyId!,
    secretAccessKey: config.aws.secretAccessKey!,
  },
});

export const uploadPdfBufferToS3 = async (buffer: Buffer, key: string) => {
  try {
    const up = new Upload({
      client: s3Client,
      params: {
        Bucket: config.aws.bucketName!,
        Key: key,
        Body: buffer,
        ContentType: 'application/pdf',
      },
    });

    await up.done();

    const url = `https://${config.aws.bucketName}.s3.${config.aws.region}.amazonaws.com/${key}`;
    return { url, key };
  } catch (e: any) {
    throw new AppError(
      400,
      `S3 upload failed: ${e?.message || 'Unknown error'}`,
    );
  }
};
