import { Types } from 'mongoose';

export interface ILawfirm {
  aboutFirm: string;
  exertise?: string;
  internshipTraining?: string;
  description: string;
  location: string;
  logo?: string;
  createBy?: Types.ObjectId;
  status?: 'approved' | 'pending' | 'rejected';
  applyNumber?: Types.ObjectId[];
}
