import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import Course from '../course/course.model';
import { IQuizzes } from './quizzes.interface';
import Quizzes from './quizzes.model';

// const createQuizzes = async (
//   userId: string,
//   payload: IQuizzes,
//   file?: Express.Multer.File,
// ) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new AppError(404, 'User not found');
//   }
//   if (file) {
//     const quizzesImage = await fileUploader.uploadToCloudinary(file);
//     payload.questions = quizzesImage?.url;
//   }
//   const quizzes = await Quizzes.create({ ...payload, createBy: user._id });
//   return quizzes;
// };

const createQuizzes = async (payload: {
  courseId: string;
  videoId: string;
  quizzes: any[];
  status?: string;
}) => {
  const { courseId, videoId, quizzes, status } = payload;

  const course = await Course.findById(courseId);
  if (!course) throw new AppError(404, 'Course not found');

  const video = course?.courseVideo?.find(
    (v) => v?._id?.toString() === videoId?.toString(),
  );

  if (!video) {
    throw new AppError(400, 'Video not found in this course');
  }

  //  Prepare quizzes
  const quizDocs = quizzes.map((quiz) => ({
    ...quiz,
    courseId,
    videoId,
    status: status || 'active',
  }));

  //  Insert many quizzes
  const createdQuizzes = await Quizzes.insertMany(quizDocs);

  //  Push all quiz IDs into video
  if (!video?.quiz) video.quiz = [];

  createdQuizzes.forEach((q) => {
    if (Array.isArray(video.quiz)) {
      video.quiz.push(q._id);
    } else {
      // Handle case where quiz is a single ObjectId or null
      video.quiz = [q._id];
    }
  });

  await course.save();

  return createdQuizzes;
};

const getAllquizzes = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = ['title', 'status'];

  // 🔍 Search
  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // 🎯 Filter
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // 📅 Year filter
  if (year) {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

    andCondition.push({
      createdAt: { $gte: startDate, $lte: endDate },
    });
  }

  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const quizzes = await Quizzes.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any)
    .populate({
      path: 'courseId',
      select: 'name courseVideo',
    })
    .populate('userId', 'name email')
    .lean();

  const formatted = quizzes.map((quiz: any) => {
    const course = quiz.courseId;

    const video = course?.courseVideo?.find(
      (v: any) => v._id.toString() === quiz.videoId.toString(),
    );

    return {
      _id: quiz._id,
      title: quiz.title,
      options: quiz.options,
      answer: quiz.answer,
      userAnswer: quiz.userAnswer,
      score: quiz.score,
      isCorrect: quiz.isCorrect,
      status: quiz.status,

      course: {
        _id: course?._id,
        name: course?.name,
      },

      video: video
        ? {
            _id: video._id,
            title: video.title,
            url: video.url,
            time: video.time,
          }
        : null,

      users: quiz.userId,
      createdAt: quiz.createdAt,
    };
  });

  const total = await Quizzes.countDocuments(whereCondition);

  return {
    data: formatted,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleQuizzes = async (id: string) => {
  const quiz: any = await Quizzes.findById(id)
    .populate({
      path: 'courseId',
      select: 'name courseVideo',
    })
    .populate('userId', 'name email')
    .lean();

  if (!quiz) {
    throw new AppError(404, 'Quiz not found');
  }

  const course = quiz.courseId;

  const video = course?.courseVideo?.find(
    (v: any) => v._id.toString() === quiz.videoId.toString(),
  );

  const formatted = {
    _id: quiz._id,
    title: quiz.title,
    options: quiz.options,
    answer: quiz.answer,
    userAnswer: quiz.userAnswer,
    score: quiz.score,
    isCorrect: quiz.isCorrect,
    status: quiz.status,

    course: {
      _id: course?._id,
      name: course?.name,
    },

    video: video
      ? {
          _id: video._id,
          title: video.title,
          url: video.url,
          time: video.time,
        }
      : null,

    user: quiz.userId, // populated user
  };

  return formatted;
};

// const uploadQuizzes = async (
//   userId: string,
//   id: string,
//   payload: Partial<IQuizzes>,
//   file?: Express.Multer.File,
// ) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new AppError(400, 'User not found');
//   }
//   const quizzes = await Quizzes.findById(id);
//   if (!quizzes) {
//     throw new AppError(400, 'quizzes not found');
//   }

//   if (user.role !== 'admin') {
//     if (quizzes?.createBy?.toString() !== user._id.toString()) {
//       throw new AppError(400, 'You are not authorized to update this quizzes');
//     }
//   }

//   if (file) {
//     const courseVideos = await fileUploader.uploadToCloudinary(file);
//     payload.questions = courseVideos.url;
//   }
//   const result = await Quizzes.findByIdAndUpdate(
//     id,
//     { ...payload, createdBy: user._id },
//     { new: true },
//   );
//   return result;
// };

const updateQuizzes = async (id: string, payload: Partial<IQuizzes>) => {
  const quiz = await Quizzes.findById(id);
  if (!quiz) throw new AppError(404, 'Quiz not found');

  if (payload.courseId || payload.videoId) {
    const courseIdToCheck = payload.courseId || quiz.courseId;
    const videoIdToCheck = payload.videoId || quiz.videoId;

    const course = await Course.findById(courseIdToCheck);
    if (!course) throw new AppError(404, 'Course not found');

    const videoExistsInCourse = course?.courseVideo?.some(
      (video) => video?._id?.toString() === videoIdToCheck?.toString(),
    );
    if (!videoExistsInCourse)
      throw new AppError(400, 'Video not found in this course');
  }

  const updatedQuiz = await Quizzes.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedQuiz;
};

const deleteQuizzes = async (id: string) => {
  const quizzes = await Quizzes.findById(id);
  if (!quizzes) {
    throw new AppError(400, 'quizzes not found');
  }

  const result = await Quizzes.findByIdAndDelete(id);
  return result;
};

export const quizzesService = {
  createQuizzes,
  getAllquizzes,
  getSingleQuizzes,
  updateQuizzes,
  deleteQuizzes,
};
