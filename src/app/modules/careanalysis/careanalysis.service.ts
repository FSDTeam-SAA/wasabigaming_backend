import AppError from '../../error/appError';
import {
  aiareanalysisSubmission,
  aicareanalysisquestion,
} from '../../helper/aiEndpoint';
import Aiassessment from '../aiassessment/aiassessment.model';
import User from '../user/user.model';
import { ICareanalysis } from './careanalysis.interface';
import Careanalysis from './careanalysis.model';

const createCareanalysis = async (userId: string, aiassigmentId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'user is not found');
  const aiassessment = await Aiassessment.findById(aiassigmentId);
  if (!aiassessment) throw new AppError(404, 'ai assessment not found');

  const aiResponse = await aicareanalysisquestion();
  //   console.log(aiResponse);
  if (!aiResponse) throw new AppError(400, 'failed to get response from ai');

  const result = await Careanalysis.create({
    applicant: user._id,
    precedentSummary: aiResponse.precedentSummary,
    pretendCase: aiResponse.pretendCase,
    aiassigmentId: aiassessment._id,
  });
  if (!result) throw new AppError(400, 'faild to create response');

  if (!aiassessment.applicationUser?.includes(user._id)) {
    aiassessment.applicationUser?.push(user._id);
    await aiassessment.save();
  }

  return result;
};

const getSingleCareanalysis = async (id: string) => {
  const result = await Careanalysis.findById(id).populate(
    'applicant',
    'firstName lastName email profileImage',
  );
  if (!result) throw new AppError(404, 'interview not found');
  return result;
};

const updateCareanalysis = async (
  id: string,
  payload: Partial<ICareanalysis>,
) => {
  const existingData = await Careanalysis.findById(id);
  if (!existingData) throw new AppError(404, 'Data not found');
  const aiResponse = await aiareanalysisSubmission(payload.yourResponse!);
  // console.log(aiResponse);
  const result = await Careanalysis.findByIdAndUpdate(
    id,
    {
      yourResponse: payload.yourResponse,
      legalIssue: aiResponse.legalIssue,
      caseLinking: aiResponse.caseLinking,
      summaryQuality: aiResponse.summaryQuality,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const careanalysisService = {
  createCareanalysis,
  getSingleCareanalysis,
  updateCareanalysis,
};
