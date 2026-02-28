import puppeteer from 'puppeteer';
import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import mongoose from 'mongoose';
import AppError from '../../error/appError';
import User from '../user/user.model';
import Course from '../course/course.model';
import VideoProgress from '../videoProgress/videoProgress.model';
import Certificate from './certificate.model';
import certificateTemplate from '../../utils/certificateTemplateInput';
import { uploadPdfBufferToS3 } from '../../helper/s3UploadPdf.ts';


const launchBrowser = async () => {
  if (process.env.NODE_ENV === 'production') {
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: (chromium as any).headless,
    });
  }
  return puppeteer.launch({ headless: true });
};

const isCourseCompletedByUser = async (userId: string, courseId: string) => {
  const course = await Course.findById(courseId);
  if (!course) throw new AppError(404, 'Course not found');

  const totalVideos = course.courseVideo?.length || 0;
  if (totalVideos === 0) return true; // no videos => completed

  const userObjectId = new mongoose.Types.ObjectId(userId);
  const courseObjectId = new mongoose.Types.ObjectId(courseId);

  const completedCount = await VideoProgress.countDocuments({
    user: userObjectId,
    course: courseObjectId,
    isCompleted: true,
  });

  return completedCount >= totalVideos;
};

const generateOrGetCertificate = async (userId: string, courseId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');

  const course = await Course.findById(courseId);
  if (!course) throw new AppError(404, 'Course not found');

  // must be enrolled/paid check (optional but recommended)
  const enrolled = course.enrolledStudents?.some(
    (id: any) => id.toString() === userId,
  );
  if (!enrolled && (course.coursePrice ?? 0) === 0) {
    // if free course, you may allow without payment but still require enroll
    throw new AppError(400, 'You are not enrolled to this course');
  }

  // already generated?
  const existing = await Certificate.findOne({
    user: user._id,
    course: course._id,
  });
  if (existing) return existing;

  // completion check
  const completed = await isCourseCompletedByUser(userId, courseId);
  if (!completed) throw new AppError(400, 'Course is not completed yet');

  const certificateId = `CERT-${Date.now()}-${Math.floor(Math.random() * 9999)}`;

  const fullName =
    `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
    (user as any).fullName ||
    user.email;

  const issueDate = new Date().toISOString().split('T')[0] || '';

  const html = certificateTemplate({
    companyName: (course as any).schoolName || 'COMPANY NAME',
    studentName: fullName,
    courseName: course.name,
    certificateId,
    issueDate,
  });

  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '18px', bottom: '18px', left: '18px', right: '18px' },
  });

  await browser.close();

  const s3Key = `certificates/certificate-${certificateId}.pdf`;
  const uploaded = await uploadPdfBufferToS3(pdfBuffer as any, s3Key);

  const cert = await Certificate.create({
    user: user._id,
    course: course._id,
    certificateId,
    issuedAt: new Date(),
    pdfUrl: uploaded.url,
    s3Key: uploaded.key,
  });

  return cert;
};

export const certificateService = {
  generateOrGetCertificate,
  isCourseCompletedByUser,
};



