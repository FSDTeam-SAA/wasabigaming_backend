import { IMockInterviewSession } from './mockInterviewSession.interface';
import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import { mockInterviewAnswerCheck, mockInterviewQuestionGenerate } from '../../helper/aiEndpoint';
import MockInterviewSession from './mockInterviewSession.model';
import { fileUploader } from '../../helper/fileUploder';

const createMockInterviewSession = async (
  payload: IMockInterviewSession
) => {
  const session = await MockInterviewSession.create({
    userId: payload.userId,
    category: payload.category,
    questionNumber: payload.questionNumber,
  });
  const aiApiCall = await mockInterviewQuestionGenerate(
    payload.category,
    Number(payload.questionNumber) 
  );

//   let questionsArray: {
//     questionText: string;
//     order: number;
//   }[] = [];

  if (!aiApiCall) {
    return { session, aiApiCall: [] };
  }
  const questionsArray = Array.isArray(aiApiCall)
    ? aiApiCall.map((q, index) => ({
        questionText: q.question,
        order: index + 1,
      }))
    : [
        {
          questionText: aiApiCall,
          order: 1,
        },
      ];

  session.questions = questionsArray;
  await session.save();

  return { session };
};
const getAllMockInterviewSessions = async (
  userId: string,
  options: IOption
) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);

  const whereCondition: any = { userId };

  const result = await MockInterviewSession.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  const total = await MockInterviewSession.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getMockInterviewSessionById = async (id: string) => {
  const session = await MockInterviewSession.findById(id);

  if (!session) {
    throw new AppError(404, 'Mock interview session not found');
  }

  return session;
};

const updateMockInterviewSession = async (
  id: string,
  payload: Partial<IMockInterviewSession>
) => {
  const session = await MockInterviewSession.findById(id);

  if (!session) {
    throw new AppError(404, 'Mock interview session not found');
  }

  const updatedSession = await MockInterviewSession.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true }
  );

  return updatedSession;
};

const deleteMockInterviewSessionById = async (id: string) => {
  const session = await MockInterviewSession.findByIdAndDelete(id);

  if (!session) {
    throw new AppError(404, 'Mock interview session not found');
  }

  return session;
};

const submitAnswer = async (payload: any, userId: string) => {
  const {
    sessionId,
    questionIndex,
    question,
    segment,
    videoFile,
  } = payload;
  const session = await MockInterviewSession.findById(sessionId);
  
  if (!session) {
    throw new AppError(404, 'Mock interview session not found');
  }
  // if (session.userId.toString() !== userId) {
  //   throw new AppError(403, 'Unauthorized');
  // }
  
  const startTime = new Date();
  const aiResult = await mockInterviewAnswerCheck(
    question,
    segment,
    videoFile.buffer,
    videoFile.originalname
  );
  
  if (!aiResult) {
    throw new AppError(500, 'AI failed to analyze answer');
  }
  console.log(aiResult);
  const endTime = new Date();
  
  const uploadedVideo = await fileUploader.uploadToCloudinary(videoFile);
  
  const answerPayload = {
    questionIndex,
    videoUrl: uploadedVideo.url,
    startTime,
    endTime,
    aiResult: {
      communication_and_clarity: aiResult.text.communication_and_clarity,
      problem_solving: aiResult.text.problem_solving,
      professionalism_and_presence: aiResult.text.professionalism_and_presence,
      Commercial_awareness: aiResult.text.Commercial_awareness,
      feedback: aiResult.text.feedback || [],
    },
  };
  
  const index = session.answers.findIndex(
    a => a.questionIndex === questionIndex
  );
  if (index !== -1) {
    session.answers[index] = answerPayload;
  } else {
    session.answers.push(answerPayload);
  }
  
  await session.save();
  return session.answers;
};
export const mockInterviewSessionService = {
  createMockInterviewSession,
  getAllMockInterviewSessions,
  getMockInterviewSessionById,
  updateMockInterviewSession,
  deleteMockInterviewSessionById,
  submitAnswer
};
