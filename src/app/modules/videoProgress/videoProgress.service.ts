import mongoose from 'mongoose';
import AppError from '../../error/appError';
import Course from '../course/course.model';
import VideoProgress from '../videoProgress/videoProgress.model';

const markVideoCompleted = async (
  userId: string,
  courseId: string,
  videoId: string,
) => {
  const course = await Course.findById(courseId);
  if (!course) throw new AppError(404, 'Course not found');

  const exists = course.courseVideo?.some(
    (v: any) => v._id.toString() === videoId,
  );
  if (!exists) throw new AppError(404, 'Video not found in this course');

  const userObjectId = new mongoose.Types.ObjectId(userId);
  const courseObjectId = new mongoose.Types.ObjectId(courseId);
  const videoObjectId = new mongoose.Types.ObjectId(videoId);

  const doc = await VideoProgress.findOneAndUpdate(
    { user: userObjectId, course: courseObjectId, video: videoObjectId },
    { isCompleted: true, completedAt: new Date() },
    { upsert: true, new: true },
  );

  return doc;
};

export const courseProgressService = { markVideoCompleted };
