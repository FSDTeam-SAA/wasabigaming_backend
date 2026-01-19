import Stripe from 'stripe';
import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
import User from '../user/user.model';
import { ICourse } from './course.interface';
import Course from './course.model';
import config from '../../config';
import Payment from '../payment/payment.model';

const stripe = new Stripe(config.stripe.secretKey!);

const createCourse = async (
  userId: string,
  payload: ICourse,
  files?: Express.Multer.File[],
  titles?: string[], // optional custom titles
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(400, 'User not found');

  const courseExist = await Course.findOne({ name: payload.name });
  if (courseExist) throw new AppError(400, 'Course already exists');

  if (files && files.length > 0) {
    const uploadedVideos = await Promise.all(
      files.map(async (file, index) => {
        const uploaded = await fileUploader.uploadToCloudinary(file);
        return {
          title: titles?.[index] || file.originalname, // use custom title or fallback
          url: uploaded.url,
          time: '00:00',
        };
      }),
    );

    payload.courseVideo = uploadedVideos;
  }

  const result = await Course.create({ ...payload, createdBy: user._id });
  return result;
};                 
                                                                         
const uploadCourse = async ( 
  userId: string,
  id: string,
  payload: Partial<ICourse>,
  files?: Express.Multer.File[],
  titles?: string[],
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(400, 'User not found');

  const course = await Course.findById(id);
  if (!course) throw new AppError(400, 'Course not found');

  if (
    user.role !== 'admin' &&
    course.createdBy &&
    course.createdBy.toString() !== user._id.toString()
  ) {
    throw new AppError(400, 'You are not authorized to update this course');
  }

  if (files && files.length > 0) {
    const uploadedVideos = await Promise.all(
      files.map(async (file, index) => {
        const uploaded = await fileUploader.uploadToCloudinary(file);
        return {
          title: titles?.[index] || file.originalname,
          url: uploaded.url,
          time: '00:00',
        };
      }),
    );

    payload.courseVideo = uploadedVideos;
  }

  const result = await Course.findByIdAndUpdate(
    id,
    { ...payload, createdBy: user._id },
    { new: true },
  );
  return result;
};
                                                                          
const getAllCourse = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, year, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = [
    'name',
    'description',
    'gradeLevel',
    'category',
  ];

  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (year) {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
    andCondition.push({ createdAt: { $gte: startDate, $lte: endDate } });
  }

  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const result = await Course.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any)
    .populate({
      path: 'courseVideo.quiz',
      model: 'Quizzes',
    });

  const total = await Course.countDocuments(whereCondition);

  return { data: result, meta: { total, page, limit } };
};

const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id).populate({
    path: 'courseVideo.quiz',
    model: 'Quizzes',
  });
  if (!result) throw new AppError(404, 'Course not found');
  return result;
};

const deleteCourse = async (userId: string, id: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(400, 'User not found');

  const course = await Course.findById(id);
  if (!course) throw new AppError(400, 'Course not found');

  if (
    user.role !== 'admin' &&
    course.createdBy &&
    course.createdBy.toString() !== user._id.toString()
  ) {
    throw new AppError(400, 'You are not authorized to delete this course');
  }

  const result = await Course.findByIdAndDelete(id);
  return result;
};

const addCourseVideo = async (
  userId: string,
  courseId: string,
  files: Express.Multer.File[],
  titles?: string[],
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(400, 'User not found');

  const course = await Course.findById(courseId);
  if (!course) throw new AppError(404, 'Course not found');

  if (
    user.role !== 'admin' &&
    course.createdBy?.toString() !== user._id.toString()
  ) {
    throw new AppError(403, 'Unauthorized');
  }

  const uploadedVideos = await Promise.all(
    files.map(async (file, index) => {
      const uploaded = await fileUploader.uploadToCloudinary(file);
      return {
        title: titles?.[index] || file.originalname,
        url: uploaded.url,
        time: '00:00',
      };
    }),
  );

  if (!course.courseVideo) {
    course.courseVideo = [];
  }
  course.courseVideo.push(...uploadedVideos);
  await course.save();

  return course;
};

const removeCourseVideo = async (
  userId: string,
  courseId: string,
  videoId: string,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(400, 'User not found');

  const course = await Course.findById(courseId);
  if (!course) throw new AppError(404, 'Course not found');

  if (
    user.role !== 'admin' &&
    course.createdBy?.toString() !== user._id.toString()
  ) {
    throw new AppError(403, 'Unauthorized');
  }

  if (!course.courseVideo) {
    throw new AppError(400, 'No videos found in this course');
  }

  course.courseVideo = course.courseVideo.filter(
    (video: any) => video._id.toString() !== videoId,
  );

  await course.save();
  return course;
};

const payCourse = async (userId: string, courseId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(400, 'User not found');

  const course = await Course.findById(courseId);
  if (!course) throw new AppError(400, 'Course not found');

  if (!user.isSubscription)
    throw new AppError(400, 'You are not subscribed to this course');

  if (user.role !== 'student')
    throw new AppError(400, 'You are not authorized to pay for this course');
  if (course.coursePrice !== 0) {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Number(course.coursePrice) * 100,
            product_data: {
              name: course.name,
              description: course.description || 'No description',
            },
          },
          quantity: 1,
        },
      ],
      customer_email: user.email,
      success_url: `${config.frontendUrl}/success`,
      cancel_url: `${config.frontendUrl}/cancel`,
      metadata: {
        userId: user._id.toString(),
        paymentType: 'course',
        courseId: course._id.toString(),
        courseName: course.name,
        coursePrice: course.coursePrice!.toString(),
      },
    } as Stripe.Checkout.SessionCreateParams);

    await Payment.create({
      user: user._id,
      course: course._id,
      amount: course.coursePrice,
      stripeSessionId: session.id,
      currency: 'usd',
      status: 'pending',
    });

    return { url: session.url, sessionId: session.id };
  }
  if (!course.enrolledStudents) {
    course.enrolledStudents = [];
  }

  const alreadyEnrolled = course.enrolledStudents.some(
    (id) => id.toString() === user._id.toString(),
  );

  if (!alreadyEnrolled) {
    course.enrolledStudents.push(user._id);
    await course.save();
  }
  await course.save();
  return { url: null, sessionId: null };
};

export const courseService = {
  createCourse,
  uploadCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  addCourseVideo,
  removeCourseVideo,
  payCourse,
};
