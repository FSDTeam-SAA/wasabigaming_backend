import AppError from '../../error/appError';
import {
  aiintrayemailquestion,
  aiintrayemailSubmission,
  aiwrittencaseStudyQuestion,
  aiwrittencaseStudySubmission,
} from '../../helper/aiEndpoint';
import Aiassessment from '../aiassessment/aiassessment.model';
import User from '../user/user.model';
import { IIntrayemail } from './intrayemail.interface';
import Intrayemail from './intrayemail.model';

const createIntrayemail = async (userId: string, aiassigmentId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'user is not found');
  const aiassessment = await Aiassessment.findById(aiassigmentId);
  if (!aiassessment) throw new AppError(404, 'ai assessment not found');

  const aiResponse = await aiintrayemailquestion();
  //   console.log(aiResponse);
  if (!aiResponse) throw new AppError(400, 'failed to get response from ai');

  const result = await Intrayemail.create({
    applicant: user._id,
    discribtion: aiResponse.instructions,
    question: aiResponse.draftEmail,
    aiassigmentId: aiassessment._id,
  });
  if (!result) throw new AppError(400, 'faild to create response');

  if (!aiassessment.applicationUser?.includes(user._id)) {
    aiassessment.applicationUser?.push(user._id);
    await aiassessment.save();
  }

  return result;
};

const getSingleIntrayemail = async (id: string) => {
  const result = await Intrayemail.findById(id).populate(
    'applicant',
    'firstName lastName email profileImage',
  );
  if (!result) throw new AppError(404, 'interview not found');
  return result;
};

const updateIntrayemail = async (
  id: string,
  payload: Partial<IIntrayemail>,
) => {
  const existingData = await Intrayemail.findById(id);
  if (!existingData) throw new AppError(404, 'Data not found');
  const aiResponse = await aiintrayemailSubmission(payload.yourResponse!);
  const result = await Intrayemail.findByIdAndUpdate(
    id,
    {
      feedback: aiResponse.feedback,
      totalScore: aiResponse.contentScore,
      wordsCompleted: aiResponse.wordCount,
      completionRate: aiResponse.completionRate,
      writingSpeed: payload.writingSpeed || 50,
      overallGrade: aiResponse.overallGrade,
      successTips: aiResponse.successTips,
      yourResponse: payload.yourResponse,
      recommendations: aiResponse.recommendations,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const intrayemailService = {
  createIntrayemail,
  getSingleIntrayemail,
  updateIntrayemail,
};
