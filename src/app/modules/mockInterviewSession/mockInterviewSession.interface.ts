import { Types } from 'mongoose';

export interface IAIResult {
  score: number;
  communication_and_clarity: number;
  problem_solving: number;
  professionalism_and_presence: number;
  Commercial_awareness:number;
  feedback: string[];
}
export interface IMockInterviewAnswer {
  questionIndex: number;
  videoUrl: string;
  startTime: Date;
  endTime: Date;
  aiResult?: IAIResult; 
}
export interface IMockInterviewQuestion {
  questionText: string;
  order: number;
}
export interface IFinalResult {
  averageScore: number;
  strengths: string[];
  weaknesses: string[];
  finalFeedback: string;
}

export interface IMockInterviewSession {
  userId: Types.ObjectId;
  mockInterviewId: Types.ObjectId;

  status?: string;
  attemptNumber?:number;
  questions?:IMockInterviewQuestion[];
  category?:string;
  questionNumber?:string;

  answers: IMockInterviewAnswer[];

  finalResult?: IFinalResult;

  createdAt?: Date;
  updatedAt?: Date;
}
