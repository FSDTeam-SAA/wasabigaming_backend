// import AppError from '../../error/appError';
// import pagination, { IOption } from '../../helper/pagenation';
// import User from '../user/user.model';
// import { IPsychometric } from './psychometric.interface';
// import Psychometric from './psychometric.model';

import mongoose from 'mongoose';
import AppError from '../../error/appError';
import PsychometricTest from '../psychometricTest/psychometricTest.model';
import PsychometricAttempt from './psychometricAttempt.model';
import pagination, { IOption } from '../../helper/pagenation';
import User from '../user/user.model';

// const createPsychometric = async (userId: string, payload: IPsychometric) => {
//   const user = await User.findById(userId);
//   if (!user) throw new AppError(404, 'User is not defiend');
//   const result = await Psychometric.create({ ...payload, createdBy: user._id });
//   if (!result) throw new AppError(404, 'User is not defiend');
//   return result;
// };

// const getAllPsychometric = async (params: any, options: IOption) => {
//   const { page, limit, skip, sortBy, sortOrder } = pagination(options);
//   const { searchTerm, year, ...filterData } = params;

//   const andCondition: any[] = [];
//   const userSearchableFields = [
//     'title',
//     'description',
//     'type',
//     'questions.difficulty',
//   ];

//   if (searchTerm) {
//     andCondition.push({
//       $or: userSearchableFields.map((field) => ({
//         [field]: { $regex: searchTerm, $options: 'i' },
//       })),
//     });
//   }

//   if (Object.keys(filterData).length) {
//     andCondition.push({
//       $and: Object.entries(filterData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   // YEAR Filter → createdAt
//   if (year) {
//     const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
//     const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

//     andCondition.push({
//       createdAt: {
//         $gte: startDate,
//         $lte: endDate,
//       },
//     });
//   }

//   const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

//   const result = await Psychometric.find(whereCondition)
//     .skip(skip)
//     .limit(limit)
//     .sort({ [sortBy]: sortOrder } as any);

//   if (!result) {
//     throw new AppError(404, 'Course not found');
//   }

//   const total = await Psychometric.countDocuments(whereCondition);

//   return {
//     data: result,
//     meta: {
//       total,
//       page,
//       limit,
//     },
//   };
// };

// const getPsychometricById = async (id: string) => {
//   const result = await Psychometric.findById(id);
//   if (!result) throw new AppError(404, 'User is not defiend');
//   return result;
// };

// const updatePsychometric = async (id: string, payload: IPsychometric) => {
//   const result = await Psychometric.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   if (!result) throw new AppError(404, 'User is not defiend');
//   return result;
// };

// const deletePsychometric = async (id: string) => {
//   const result = await Psychometric.findByIdAndDelete(id);
//   if (!result) throw new AppError(404, 'User is not defiend');
//   return result;
// };

// export const psychometricService = {
//   createPsychometric,
//   getAllPsychometric,
//   getPsychometricById,
//   updatePsychometric,
//   deletePsychometric,
// };

//================================ update ============================================
const submitPsychometricTest = async (
  testId: string,
  userId: string,
  answers: any[],
) => {
  const test = await PsychometricTest.findById(testId);
  if (!test) throw new AppError(404, 'Test not found');

  const alreadyAttempted = await PsychometricAttempt.findOne({
    test: testId,
    user: userId,
  });
  if (alreadyAttempted) {
    throw new AppError(400, 'Already attempted');
  }

  let score = 0;
  let totalTime = 0;

  const evaluatedAnswers = answers.map((ans) => {
    const question = test.allQuestions.find(
      (q: any) => q._id.toString() === ans.questionId,
    );

    if (!question) {
      throw new AppError(
        400,
        `Question with ID ${ans.questionId} not found in test`,
      );
    }

    const isCorrect = question.answer === ans.userAnswer;
    if (isCorrect) score++;

    totalTime += ans.timeTakenSec;

    return {
      questionId: ans.questionId,
      userAnswer: ans.userAnswer,
      isCorrect,
      timeTakenSec: ans.timeTakenSec,
    };
  });

  if (!test.attamUser?.some((id) => id.toString() === userId.toString())) {
    test.attamUser?.push(new mongoose.Types.ObjectId(userId));
    await test.save();
  }

  return PsychometricAttempt.create({
    user: userId,
    test: testId,
    answers: evaluatedAnswers,
    score,
    totalTime,
  });
};

const tryAgainPsychometricAttempt = async (
  testId: string,
  userId: string,
  answers: any[],
) => {
  const test = await PsychometricTest.findById(testId);
  if (!test) throw new AppError(404, 'Test not found');

  const previousAttempt = await PsychometricAttempt.findOne({
    test: testId,
    user: userId,
  });

  if (previousAttempt) {
    await previousAttempt.deleteOne();
  }

  let score = 0;
  let totalTime = 0;

  const evaluatedAnswers = answers.map((ans) => {
    const question = test.allQuestions.find(
      (q: any) => q._id.toString() === ans.questionId,
    );

    if (!question) {
      throw new AppError(
        400,
        `Question with ID ${ans.questionId} not found in test`,
      );
    }

    const isCorrect = question.answer === ans.userAnswer;
    if (isCorrect) score++;

    totalTime += ans.timeTakenSec;

    return {
      questionId: ans.questionId,
      userAnswer: ans.userAnswer,
      isCorrect,
      timeTakenSec: ans.timeTakenSec,
    };
  });

  return PsychometricAttempt.create({
    user: userId,
    test: testId,
    answers: evaluatedAnswers,
    score,
    totalTime,
  });
};

const getMyPsychometricAnswers = async (
  userId: string,
  params: any,
  options: IOption,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');

  const {
    page,
    limit,
    skip,
    sortBy = 'createdAt',
    sortOrder = -1,
  } = pagination(options);
  const { year, ...filterData } = params;

  const andCondition: any[] = [{ user: userId }];

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
    andCondition.push({
      createdAt: { $gte: startDate, $lte: endDate },
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const attempts = await PsychometricAttempt.find(whereCondition)
    .populate('test', 'category')
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any)
    .lean();

  if (!attempts || attempts.length === 0) {
    throw new AppError(404, 'No attempts found');
  }

  const total = await PsychometricAttempt.countDocuments(whereCondition);

  return {
    data: attempts,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const myOverallResult = async (userId: string) => {
  const attempts = await PsychometricAttempt.find({ user: userId }).populate(
    'test',
    'category',
  );

  if (!attempts || attempts.length === 0) {
    throw new AppError(404, 'No attempts found');
  }

  const result = attempts.map((attempt: any) => ({
    testId: attempt.test._id,
    category: attempt.test.category,
    score: attempt.score,
    totalTime: attempt.totalTime,
    attemptedAt: attempt.createdAt,
  }));

  const overallScore =
    result.reduce((acc, curr) => acc + curr.score, 0) / result.length;

  return {
    result,
    overallScore,
  };
};
const getSinglePsychometricAttempt = async (attemptId: string) => {
  const attempt = await PsychometricAttempt.findById(attemptId)
    .populate('user', 'firstName lastName email profileImage')
    .populate('test');

  if (!attempt) {
    throw new AppError(404, 'Attempt not found');
  }
  

  return attempt;
};

export const psychometricAttemptService = {
  submitPsychometricTest,
  tryAgainPsychometricAttempt,
  getMyPsychometricAnswers,
  myOverallResult,
  getSinglePsychometricAttempt,
};
