import { Types } from 'mongoose';

export interface IApplicant {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
}

export interface ICoverLetter {
  jobDescription: string;
  uploadCv?: string;
  applicant?: IApplicant;

  coverLetter?: {
    subject?: string;
    paragraphs?: string[];
  };

  createBy: Types.ObjectId;
}
