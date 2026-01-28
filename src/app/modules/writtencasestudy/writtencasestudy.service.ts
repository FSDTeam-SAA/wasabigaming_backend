import AppError from '../../error/appError';
import {
  aiwrittencaseStudyQuestion,
  aiwrittencaseStudySubmission,
} from '../../helper/aiEndpoint';
import Aiassessment from '../aiassessment/aiassessment.model';
import User from '../user/user.model';
import { IWrittencasestudy } from './writtencasestudy.interface';
import Writtencasestudy from './writtencasestudy.model';

const createWrittenCaseStudy = async (
  userId: string,
  aiassigmentId: string,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'user is not found');
  const aiassessment = await Aiassessment.findById(aiassigmentId);
  if (!aiassessment) throw new AppError(404, 'ai assessment not found');

  const aiResponse = await aiwrittencaseStudyQuestion();
  //   console.log(aiResponse);
  if (!aiResponse) throw new AppError(400, 'failed to get response from ai');

  const result = await Writtencasestudy.create({
    applicant: user._id,
    roleContext: aiResponse.roleContext,
    ventaraAutomotive: aiResponse.caseStudy,
    aiassigmentId: aiassessment._id,
  });
  if (!result) throw new AppError(400, 'faild to create response');

  if (!aiassessment.applicationUser?.includes(user._id)) {
    aiassessment.applicationUser?.push(user._id);
    await aiassessment.save();
  }

  return result;
};

const getSingleWrittenCaseStudy = async (id: string) => {
  const result = await Writtencasestudy.findById(id).populate(
    'applicant',
    'firstName lastName email profileImage',
  );
  if (!result) throw new AppError(404, 'interview not found');
  return result;
};

const updateWrittenCaseStudy = async (
  id: string,
  payload: Partial<IWrittencasestudy>,
) => {
  const existingData = await Writtencasestudy.findById(id);
  if (!existingData) throw new AppError(404, 'Data not found');
  const aiResponse = await aiwrittencaseStudySubmission(payload.yourResponse!);
  const result = await Writtencasestudy.findByIdAndUpdate(
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

export const writtencasestudyService = {
  createWrittenCaseStudy,
  getSingleWrittenCaseStudy,
  updateWrittenCaseStudy,
};
